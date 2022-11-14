import React from 'react';
import NavBar from '../../components/NavBar-component/NavBar'

import MapComponent from "../../components/Map/MapComponent";
import Tags from "../../components/Tags/TagComponent";
import "ol/ol.css";
import "./create.css";
// import Header from '../../components/header-component/header'

const CreateARun = () => {
  
return (
  
  
  <div className= "main-wrapper">
     
     <div className= "main-wrapper">
     <div className = "createFeatures">
     
     <div className='tagButtons'>
     <h1 id ="tagsText">Select the tags that apply to your run</h1>
     <Tags/>
     </div>
     <div className='map'>
     <MapComponent />
     </div>
    
     </div>  
    {/* <div className = "map">
      <MapComponent />
    </div>   

    <div className = "tags">
    <Tags/>
    </div> */}
    </div>
  </div>
  
  );
}
  export default CreateARun;