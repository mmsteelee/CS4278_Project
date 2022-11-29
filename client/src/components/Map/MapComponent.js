import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { fromLonLat, toLonLat } from "ol/proj";
import { Draw } from "ol/interaction";
import { LineString, MultiPoint, Point } from "ol/geom";
import { OSM, Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import GeoJSON from 'ol/format/GeoJSON';
import { ApiKeyManager } from "@esri/arcgis-rest-request";
import { solveRoute } from "@esri/arcgis-rest-routing";
import travelMode from '../../constants/TravelMode.json'

import {
  formatLength,
  completeStyle,
  labelStyle,
  getDistance,
  waypointStyle,
  stopsStyle
} from "./MeasuringComponent";
import { Feature } from "ol";

const authentication = ApiKeyManager.fromKey(process.env.REACT_APP_ARCGIS_KEY);

const endptFeatureID = 'EndPoints';
const wayptFeatureID = 'WayPoints'
const routeFeatureID = 'Route'

const MapComponent = forwardRef(({updateMap, editable=true, mapData}, ref) => {
  const [map, setMap] = useState();
  const mapElement = useRef()
  const [source, setSource] = useState(
    new VectorSource({
      format: new GeoJSON(),
  }))
  const [drawFeature, setDrawFeature] = useState(
    new Feature({
      name: 'Drawn Point'
  }))
 
  const [routeIDStack] = useState([])
  const [totalWaypts] = useState([])
  let [totalRoute] = useState([])
  let distance = 0.0

  useImperativeHandle(ref, () => ({
    reset() {
      source.clear()
    }
  }))

  const calcDistance = () => {
    let dist = 0
    for (const i in totalRoute) {
      dist += getDistance(new LineString(totalRoute[i]))
    }
    return dist
  }

  const styleFunction = (feature) => {
    let retStyle = [];
    const geometry = feature.getGeometry();
    // const type = geometry.getType();
    const name = feature.get('name')
  
    if (name === 'EndPoints') {
      retStyle.push(waypointStyle)
      let startPt = new Point(geometry.getFirstCoordinate())
      retStyle.push(labelStyle('Start', startPt))
      if (geometry.getCoordinates().length > 1) {
        let endPt = new Point(geometry.getLastCoordinate())

        retStyle.push(labelStyle('End: ' + formatLength(calcDistance()), endPt))
      }
    } else if (name === 'WayPoints') {
      retStyle.push(stopsStyle)
    } else if (name === 'Route') {
      retStyle.push(completeStyle)
    }
    return retStyle;
  };

  const [vector] = useState(
    new VectorLayer({
      source: source,
      style: styleFunction
  }))

  const submit = (route, waypoints) => {
    distance = calcDistance() / 1.609
    updateMap(route.flat().map(x => toLonLat(x).map(y => y.toFixed(5))), 
              waypoints.map(x => toLonLat(x).map(y => y.toFixed(5))),
              distance)
  }

  const undo = () => {
    let startPt = source.getFeatureById(endptFeatureID)?.getGeometry().getCoordinates()
    let waypts = source.getFeatureById(wayptFeatureID)?.getGeometry().getCoordinates()
    totalRoute.pop()
    totalWaypts.pop()

    submit(totalRoute, totalWaypts)

    if (!startPt) {
      return
    } 
    if (startPt.length < 2) {
      source.removeFeature(source.getFeatureById(endptFeatureID))
      return
    } else if (!waypts) {
      source.getFeatureById(endptFeatureID).setGeometry(new MultiPoint([startPt[0]]))
    } else  {
      source.getFeatureById(endptFeatureID).setGeometry(new MultiPoint([startPt[0], waypts[waypts.length-1]]))
      if (waypts.length > 1) {
        waypts.pop()
        source.getFeatureById(wayptFeatureID).setGeometry(new MultiPoint(waypts))
      } else {
        source.removeFeature(source.getFeatureById(wayptFeatureID))
      }
    }
    const routeID = routeIDStack.pop()
    source.removeFeature(source.getFeatureById(routeID))
  }

  const findRoute = (pt1, pt2) => {
    solveRoute({
      stops: [
        toLonLat(pt1),
        toLonLat(pt2),
      ],
      params: {
        returnDirections: true,
        directionsLanguage: "es",
        travelMode: travelMode,
      },
      authentication: authentication,
    }).then(response => {
      let resRoute = response.routes.geoJson.features[0].geometry.coordinates.map(x => fromLonLat(x))
      
      let route = new Feature({
        name: 'Route',
        geometry: new LineString(resRoute)
      })

      let id = routeFeatureID+routeIDStack.length
      route.setId(id)
      routeIDStack.push(id)

      totalRoute.push(resRoute)
  
      source.addFeature(route)

      submit(totalRoute, totalWaypts)
    }).catch(err => console.log(err));
  }

  const onDrawEnd = (event) => {
    let newWaypt = event.feature.getGeometry().getCoordinates()
    let startPt = source.getFeatureById(endptFeatureID)?.getGeometry().getCoordinates()
    let waypts = source.getFeatureById(wayptFeatureID)?.getGeometry().getCoordinates()
    // let route = source.getFeatures()[1]?.getGeometry().getCoordinates()
    totalWaypts.push(newWaypt[0])

    let feature, lastPt

    // add new wypt to appropriate feature
    if (!startPt) {
      feature = new Feature({
        name: 'EndPoints',
        geometry: new MultiPoint([newWaypt[0]]),
      })
      feature.setId(endptFeatureID)
      // feature.setStyle(waypointStyle)
    } else if (startPt.length < 2) {
      lastPt = startPt[0]
      startPt.push(newWaypt[0])
      source.getFeatureById(endptFeatureID).setGeometry(new MultiPoint(startPt))
    } else if (!waypts) {
      feature = new Feature({
        name: 'WayPoints',
        geometry: new MultiPoint([startPt[1]]),
      })
      feature.setId(wayptFeatureID)
      lastPt = startPt[1]

      startPt[1] = newWaypt[0]
      source.getFeatureById(endptFeatureID).setGeometry(new MultiPoint(startPt))
    } else {
      lastPt = startPt[1]
      waypts.push(lastPt)
      source.getFeatureById(wayptFeatureID).setGeometry(new MultiPoint(waypts))
      
      startPt[1] = newWaypt[0]
      source.getFeatureById(endptFeatureID).setGeometry(new MultiPoint(startPt))
    }
    
    if (feature) {
      source.addFeature(feature)
    }

    if (lastPt) {
      // submit data after finding route
      findRoute(lastPt, newWaypt[0])
    }
  }

  const introduceData = () => {
    const points = mapData.waypoints.map(x => fromLonLat(x))
    const coords = mapData.route.map(x => fromLonLat(x))
    distance = mapData.distance
    totalRoute = [coords] 
    vector.changed()

    const route = new Feature({
      name: 'LineString',
      geometry: new LineString(coords)
    })
    route.setStyle(completeStyle)
    source.addFeature(route)

    let endPointsGeometry
    let waypointsGeometry
    if (mapData.waypoints.length == 1) {
      endPointsGeometry = new MultiPoint([points[0]])
    } else if (points.length == 2) {
      endPointsGeometry = new MultiPoint([points[0], points[1]])
    } else if (points.length > 2) {
      endPointsGeometry = new MultiPoint([points[0], points[points.length - 1]])
      points.shift()
      points.pop()
      waypointsGeometry = new MultiPoint(points)
    }

    if (endPointsGeometry) {
      const endPoints = new Feature({
        name: 'EndPoints',
        geometry: endPointsGeometry
      })

      // endPoints.setStyle(waypointStyle)
      source.addFeature(endPoints)
    }

    if (waypointsGeometry) {
      const waypoints = new Feature({
        name: 'WayPoints',
        geometry: waypointsGeometry
      })

      source.addFeature(waypoints)
    }
  }

  useEffect(() => {
    const raster = new TileLayer({
      source: new OSM(),
    });
    // const vector = new VectorLayer({
    //   source: source,
    //   style: styleFunction
    // });

    const _map = new Map({
      target: mapElement.current,
      layers: [raster,vector],
     // target:'_map',
      view: new View({}),
    });
   
    let draw;
    const addInteraction = () => {
      const drawType = 'MultiPoint'; //draws points
      draw = new Draw({
        feature: drawFeature,
        type: drawType,
        style: waypointStyle,
      });
      draw.on("drawend", onDrawEnd);
      _map.addInteraction(draw);
    };
    
    if (!editable) {
      introduceData()
      _map.getView().fit(source.getExtent(), _map.getSize());
      _map.getView().setZoom(_map.getView().getZoom() - 0.5);
      _map.getInteractions().forEach(x => x.setActive(false))
    } else {
      _map.setView(new View({
        center: fromLonLat([-86.8027, 36.1447]),
        zoom: 15,
      }))
      addInteraction();
    }

    setMap(_map);
  }, []);
  

  return (
    <>
      <div ref={mapElement} className="map-container"></div>
      <button onClick={undo}>undo</button>
    </>
  );
})

export default MapComponent;