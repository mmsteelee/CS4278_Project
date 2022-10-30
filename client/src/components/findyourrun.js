
import React from 'react';
import NavBar from './NavBar.js'

import MapComponent from "./Map/MapComponent";
import "ol/ol.css";
import "./findyourrun.css";

const FindYourRun = () => {
  
return (
  
  <div>

<NavBar/>   

        <MapComponent />
      
    </div>
  );
}
  export default FindYourRun;