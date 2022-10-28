import React, { useState } from 'react';
import NavBar from './NavBar.js'

import Map from './Map/Map';
import Layers from './Layers/Layers';
import TileLayer from './Layers/TileLayer';
import VectorLayer from "./Layers/VectorLayer";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector } from "./Source";
import { fromLonLat, get } from 'ol/proj';
//import GeoJSON from 'ol/format/GeoJSON';


const FindYourRun = () => {
  const [center, setCenter] = useState([-86.8027, 36.1447]);//long,lat
  const [zoom, setZoom] = useState(15); //zoom of map
return (
  
  <div>

<NavBar/>
    
    <div className='container'>
      
      <h1>Find Your Run</h1>
    </div>
    <Map center={fromLonLat(center)} zoom={zoom}>
      <Layers>
        <TileLayer
          source={osm()}
          zIndex={0}
        />
        
      </Layers>
     
    </Map>
    </div>
  );
}
  export default FindYourRun;