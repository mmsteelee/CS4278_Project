
import React from 'react';
import NavBar from '../../components/NavBar-component/NavBar'

import MapComponent from "../../components/Map/MapComponent";
import "ol/ol.css";
import "./findyourrun.css";
import Header from '../../components/header-component/header'

const FindYourRun = () => {
  
return (
  
  
  <div className= "main-wrapper">
     
<div className = "links">

  
</div>
    <div className = "map">
      <MapComponent />
    </div>   
  </div>
  
  );
}
  export default FindYourRun;