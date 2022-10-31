
import React from 'react';
import NavBar from '../../components/NavBar-component/NavBar'

import MapComponent from "../../components/Map/MapComponent";
import "ol/ol.css";
import "./findyourrun.css";
import Header from '../../components/header-component/header'

const FindYourRun = () => {
  
return (
  
  
  <div className= "main-wrapper">
    <Header></Header>
    <NavBar/> 

    <div className = "map">
      <MapComponent />
    </div>   
  </div>
  
  );
}
  export default FindYourRun;