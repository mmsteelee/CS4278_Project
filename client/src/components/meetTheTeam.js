import React from 'react'
// //import { Link } from "react-router-dom";
import NavBar from '../components/NavBar-component/NavBar'
import Header from './header-component/header.js';

const MeetTheTeam = () => {
    return (
  
        <div class= "main-wrapper">
        <Header></Header>
        
        <NavBar/>
    
      <div className='container'>
        
        <h1>Meet the Team</h1>
      </div>
      </div>
   
    );
  };
    
  export default MeetTheTeam;