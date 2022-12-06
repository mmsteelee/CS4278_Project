
import React from 'react';
import { useRef, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
//import NavBar from '../../components/NavBar-component/NavBar'
import Button from '@material-ui/core/Button';
import Tags from "../../components/Tags/TagComponent";
import MapComponent from "../../components/Map/MapComponent";
import Dropdown from '../../components/Dropdown/DropdownComponent';
import "./findyourrun.css";



const FindYourRun = () => {
  const tagsRef = useRef()
  


  
  //const mapRef = useRef()
  const navigate = useNavigate();

  const navigateToCreate = () => {
    navigate('/create');
  }

  const navigateToFind = () => {
    navigate('/find');
  }

  const updateTags = (tags_) => {
    
    console.log("updateTags");
  }


return (
  
  
  <div className= "main-wrapper">
     
    <div className = "links">

      <button id="create" onClick={navigateToCreate}>
          Create A Run
      </button>
      <button id="find" onClick={navigateToFind}>
          Find A Run
      </button>



    </div>
    
     
  </div>
  
  );
}
  export default FindYourRun;