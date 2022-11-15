
import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
//import NavBar from '../../components/NavBar-component/NavBar'
import Button from '@material-ui/core/Button';
import "./findyourrun.css";



const FindYourRun = () => {
  const navigate = useNavigate();

  const navigateToCreate = () => {
    navigate('/create');
  }

  const navigateToFind = () => {
    navigate('/find');
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