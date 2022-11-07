import React from 'react';
import NavBar from '../../components/NavBar-component/NavBar'

import MapComponent from "../../components/Map/MapComponent";
import "ol/ol.css";
import "./create.css";
// import Header from '../../components/header-component/header'

const CreateARun = () => {
  
return (
  
  
  <div className= "main-wrapper">
     

    <div className = "map">
      <MapComponent />
    </div>   
  </div>
  
  );
}
  export default CreateARun;