import { MultiPoint } from "ol/geom";
import { getLength } from "ol/sphere";
import {
  Circle as CircleStyle,
  Fill,
  Icon,
  RegularShape,
  Stroke,
  Style,
  Text,
} from "ol/style";
import { BACKEND_URL } from "../../constants";

export const waypointStyle = new Style({
  image: new Icon({
    anchor: [0.5, 0.9],
    src: `${BACKEND_URL}/image/waypoint.png`,
    scale: 0.03
  })
});

export const stopsStyle = new Style({
  image: new CircleStyle({
    radius: 5,
    fill: new Fill({color: 'black'}),
    stroke: new Stroke({
      color: 'rgba(189, 150, 23, 1.0)', 
      width: 2
    })
  })
});

export const style = new Style({
  fill: new Fill({
    color: "rgba(255, 255, 255, 0.2)",
  }),
  stroke: new Stroke({
    color: "rgba(0, 0, 0, 0.5)", //color of dotted line
    lineDash: [10, 10],
    width: 2,
  }),
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: "rgba(0, 0, 0, 0.7)",
    }),
    fill: new Fill({
      color: "rgba(255, 255, 255, 0.2)",
    }),
  }),
});

export const completeStyle = new Style({ //style for line that is finished being traced
  fill: new Fill({
    color: "rgba(255, 255, 255, 0.2)",
  }),
  stroke: new Stroke({
    color: "rgba(189, 150, 23, 1.0)", //color of  line
    //lineDash: [10, 10],
    width: 4,
  }),
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: "rgba(0, 0, 0, 0.7)",
    }),
    fill: new Fill({
      color: "rgba(255, 255, 255, 0.2)",
    }),
  }),
});

export const labelStyle = (text, geometry) => {
  return new Style({
    text: new Text({
      text: text,
      font: "14px Calibri,sans-serif",
      fill: new Fill({
        color: "rgba(255, 255, 255, 1)",
      }),
      backgroundFill: new Fill({
        color: "rgba(0, 0, 0, 0.7)",
      }),
      padding: [3, 3, 3, 3],
      textBaseline: "bottom",
      offsetY: 25,
    }),
    geometry: geometry
  });
}

export const tipStyle = new Style({
  text: new Text({
    font: "12px Calibri,sans-serif",
    fill: new Fill({
      color: "rgba(255, 255, 255, 1)",
    }),
    backgroundFill: new Fill({
      color: "rgba(0, 0, 0, 0.4)",
    }),
    padding: [2, 2, 2, 2],
    textAlign: "left",
    offsetX: 15,
  }),
});

export const formatLength = function (length, miles = true) {
  let kmLength;
  let mileLength;
  let meterLength;
  let feetLength;
  let output;
  if (length > 1) {
    kmLength = length;
    mileLength = miles ? length : Math.round((kmLength / 1.609)*100)/ 100;
    //output = Math.round((length / 1000) * 100) / 100 + " km";
    output = parseFloat(mileLength).toFixed(2) + " mi";
  } else {
    meterLength = length * 1000.0;
    feetLength = miles ? length * 5280.0 : Math.round((meterLength * 3.281)* 100) / 100;
    //output = Math.round(length * 100) / 100 + " m";
    output = parseFloat(feetLength).toFixed(0) + " ft";
  }
  return output;
};

export const getDistance = function (line) {
  const length = getLength(line);
  let kmLength;
  let mileLength;
    kmLength =(length / 1000);
    mileLength = Math.round((kmLength / 1.609)*100)/ 100;
  
  return mileLength;
};

//modified from code in https://github.com/ldreaaml/react-openlayers-map/blob/master/src/map/MeasuringComponent.js
//and https://openlayers.org/en/latest/examples/measure.html