import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import Overlay from "ol/Overlay";
import { transform, fromLonLat, toLonLat } from "ol/proj";
import { Draw, Modify } from "ol/interaction";
import { LineString, Point } from "ol/geom";
import { OSM, Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import GeoJSON from 'ol/format/GeoJSON';

import {
  formatArea,
  formatLength,
  modifyStyle,
  segmentStyle,
  style,
  completeStyle,
  labelStyle,
  tipStyle,
  getDistance
} from "./MeasuringComponent";
import { Feature } from "ol";

let distance = 0.0;

let tipPoint;

const segmentStyles = [segmentStyle];

const styleFunction = (feature, segments, drawType, tip) => {
  //drawing lines for measuring tools
 const styles = [style];
 const finishedStyle = [completeStyle];
  if(segments){
    const styles = [completeStyle];
  }
  
  const geometry = feature.getGeometry();
  const type = geometry.getType();
  let point, label, line;
  if (!drawType || drawType === type) {
    if (type === 'Polygon') {
      point = geometry.getInteriorPoint();
      label = formatArea(geometry);
      line = new LineString(geometry.getCoordinates()[0]);
    } else if (type === 'LineString') {
      point = new Point(geometry.getLastCoordinate());
      label = formatLength(geometry);
      distance = getDistance(geometry);
      //console.log(distance);
      line = geometry;
    }
  }
  if (segments && line) { //not needed unless we want distance for each segment
    // let count = 0;
    // line.forEachSegment(function (a, b) {
    //   const segment = new LineString([a, b]);
    //   const label = formatLength(segment);
    //   if (segmentStyles.length - 1 < count) {
    //     segmentStyles.push(segmentStyle.clone());
    //   }
    //   const segmentPoint = new Point(segment.getCoordinateAt(0.5));
    //   segmentStyles[count].setGeometry(segmentPoint);
    //   segmentStyles[count].getText().setText(label);
    //   finishedStyle.push(segmentStyles[count]);
    //   count++;
   // });
  }
  if (label) {
    labelStyle.setGeometry(point);
    labelStyle.getText().setText(label);
    styles.push(labelStyle);
    finishedStyle.push(labelStyle);
  }
  if (
    tip &&
    type === "Point" 
    // && !modify.getOverlay().getSource().getFeatures().length
  ) {
    tipPoint = geometry;
    tipStyle.getText().setText(tip);
    styles.push(tipStyle);
  }
  if(segments){
  return finishedStyle; //returns style for a finished route
  }
  return styles;
};

const MapComponent = forwardRef(({updateMap, editable=true, points=[]}, ref) => {
  const [map, setMap] = useState();
  const mapElement = useRef()
  const [source, setSource] = useState(
    new VectorSource({
      format: new GeoJSON(),
    }
  ))

  useImperativeHandle(ref, () => ({
    reset() {
      source.clear()
    }
  }))

  const getCentroid = () => {
    if (points.length === 0) {
      return fromLonLat([-86.8027, 36.1447])
    }

    let x_sum = 0
    let y_sum = 0
    for (let x in points) {
      x_sum += points[x][0]
      y_sum += points[x][1]
    }

    return fromLonLat([x_sum / points.length, y_sum / points.length])
  }

  useEffect(() => {
    let coords = new LineString(points.map(x => fromLonLat(x)))
    const startRouteFeature = new Feature({
      name: 'Line',
      geometry: coords
    })
    const raster = new TileLayer({
      source: new OSM(),
    });
    source.addFeature(startRouteFeature)

    const vector = new VectorLayer({
      source: source,
      style: function (feature) {
        return styleFunction(feature, true); //happens when measure is over
      },
    });
    let centroid = getCentroid()
    const _map = new Map({
      target: mapElement.current,
      layers: [raster,vector],
     // target:'_map',
      view: new View({
        center: centroid, // long, lat of Vanderbilt
        zoom: 15, //zoom level
      }),
    });

    _map.getView().fit(source.getExtent(), _map.getSize());
    _map.getView().setZoom(_map.getView().getZoom() - 0.5);

    const submit = (coords) => {
      coords = coords.map(x => toLonLat(x))
      updateMap(coords, distance)
    }
    let draw;

    const addInteraction = () => {
      const drawType = 'LineString';//draws lines
      const activeTip = "Double click to stop drawing the run";
      const idleTip = "Click to start measuring";
      let tip = idleTip;
      draw = new Draw({
        source: source,
        type: drawType,
        style: function (feature) {
          return styleFunction(feature, false, drawType, tip);
        },
      });
      draw.on("drawstart", function () {
        source.clear();
        // modify.setActive(false);
        tip = activeTip;
      });
      draw.on("drawend", function (event) {
        modifyStyle.setGeometry(tipPoint);
        // modify.setActive(true);
        _map.once("pointermove", function () {
          modifyStyle.setGeometry();
        });
        submit(event.feature.getGeometry().getCoordinates())
        tip = idleTip;
      });
      // modify.setActive(true);
      _map.addInteraction(draw);
    };

    if (editable) {
      addInteraction();
    } else {
      _map.getInteractions().forEach(x => x.setActive(false))
    }

    setMap(_map);
  }, []);

  return (
    <>
      <div ref={mapElement} className="map-container"></div>
    </>
  );
})

export default MapComponent;

//Modified from code in https://github.com/ldreaaml/react-openlayers-map/blob/master/src/map/MapComponent.js
//and https://openlayers.org/en/latest/examples/measure.html