import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import Overlay from "ol/Overlay";
import { transform, fromLonLat } from "ol/proj";
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
import { makeRun } from "../../api/runs";

let distance = 0.0;
const raster = new TileLayer({
  source: new OSM(),
});

const source = new VectorSource({
  format: new GeoJSON(),
});

const vector = new VectorLayer({
  source: source,
  style: {
    'fill-color': 'rgba(255, 255, 255, 0.2)',
    'stroke-color': '#ffcc33',
    'stroke-width': 2,
    'circle-radius': 7,
    'circle-fill-color': '#ffcc33',
  },
});

let tipPoint;

const segmentStyles = [segmentStyle];

const modify = new Modify({ source: source, style: modifyStyle });

const styleFunction = (feature, segments, drawType, tip) => {
  //drawing lines for measuring tools
 const styles = [style];
 const finishedStyle = [completeStyle];
  if(segments){
    const styles = [completeStyle];
    console.log("complete style");
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
    type === "Point" &&
    !modify.getOverlay().getSource().getFeatures().length
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

const MapComponent = () => {
  const [map, setMap] = useState();
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;
  useEffect(() => {
    const vector = new VectorLayer({
      source: source,
      style: function (feature) {
        return styleFunction(feature, true); //happens when measure is over
      },
    });
    const _map = new Map({
      target: mapElement.current,
      layers: [raster,vector],
     // target:'_map',
      view: new View({
        center: fromLonLat([-86.8027, 36.1447]), // long, lat of Vanderbilt
        zoom: 15, //zoom level
      }),
    });

    _map.addInteraction(modify);
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
        modify.setActive(false);
        tip = activeTip;
      });
      draw.on("drawend", function () {
        modifyStyle.setGeometry(tipPoint);
        modify.setActive(true);
        _map.once("pointermove", function () {
          modifyStyle.setGeometry();
        });
        tip = idleTip;
      });
      modify.setActive(true);
      _map.addInteraction(draw);
    };
    addInteraction();

    

    var canvas = document.createElement("canvas");
    canvas.id = "a_boat";
    canvas.width = 20;
    canvas.height = 20;
    canvas.style.zIndex = 1;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);
    const markerOverlay = new Overlay({
      element: canvas,
      positioning: "center-center",
      stopEvent: false,
      autoPan: true,
      offset: [-10, -10],
    });

    
   
    
   
    setMap(_map);
  }, []);

  const removeLines = () => {
    source.clear();
  };

  const uploadMap = () => {
    console.log(distance);

    let runData = map.getAllLayers()[1].getSource()
                     .getFeatures()[0].getGeometry()
                     .getCoordinates()
    source.clear();
    let runMeta = {name: 'Test Name',
                   distance: distance,
                   tags: ['tag1, tag2']}
    let run = {meta: runMeta, data: {coordinates: JSON.stringify(runData)}}

    makeRun(run)
      .then(console.log('Successfull upload'))
      .catch(err => console.log(err))
    //Add in whatever should happen when you upload here
  };

  const getRouteDistance = () => {
   
    console.log(distance);
    //return distance

  };

  return (
    <>
      <div ref={mapElement} className="map-container"></div>
      <div className="measuring-tool">
        <button className="reset-button" onClick={removeLines}>
          Start Over
        </button>
        <button className="upload-button" onClick={uploadMap}>
          Upload
        </button>
       
      </div>
    </>
  );
};

export default MapComponent;

//Modified from code in https://github.com/ldreaaml/react-openlayers-map/blob/master/src/map/MapComponent.js
//and https://openlayers.org/en/latest/examples/measure.html