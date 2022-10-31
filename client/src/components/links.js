import React from 'react'
// //import { Link } from "react-router-dom";
import NavBar from '../components/NavBar-component/NavBar'
import Header from '../components/header-component/header'

const Links = () => {
    return (
      
        <div class= "main-wrapper">
        <Header></Header>
        <NavBar/>
    
      <div className='container'>
        
        <h1>Links</h1>
        <table>
          <tr> 
            <a href="https://groupme.com/join_group/88408537/MKZan3OD"> GroupMe </a>
          </tr>
          <tr> 
            <a href="https://docs.google.com/spreadsheets/d/1EDIrVz3ZESnqif_Kfs86KTd_whF9-cg_210EIRAJ2dU/edit"> Practice Signups </a>
          </tr>
          <tr>
            <a href="https://www.instagram.com/vandyrunclub/?hl=en"> Instagram Page </a>
          </tr>
          <tr> 
            <a href="https://anchorlink.vanderbilt.edu/organization/runningclub"> Join the AnchorLink </a>
          </tr>
        </table>
        
      </div>
      </div>
  
    );
  };
    
  export default Links;