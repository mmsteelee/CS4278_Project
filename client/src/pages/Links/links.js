import React from 'react'
// //import { Link } from "react-router-dom";
import NavBar from '../../components/NavBar-component/NavBar.js'
import Header from '../../components/header-component/header.js'
import './links.css'

const Links = () => {
    return (
      <div>
        <div className= "main-wrapper">
          <Header></Header>
          <NavBar/>
          <div className='links'>
            <h1>Click on these links for our other websites!</h1>
          <table>
            <div className = 'tr'>
              <a href="https://groupme.com/join_group/88408537/MKZan3OD"> GroupMe </a>
              <a href="https://docs.google.com/spreadsheets/d/1EDIrVz3ZESnqif_Kfs86KTd_whF9-cg_210EIRAJ2dU/edit"> Practice Signups </a>
              <a href="https://www.instagram.com/vandyrunclub/?hl=en"> Instagram Page </a>
              <a href="https://anchorlink.vanderbilt.edu/organization/runningclub"> Join the AnchorLink </a>
            </div>
          </table>
        </div>
      </div>
    </div>
  
    );
  };
    
  export default Links;