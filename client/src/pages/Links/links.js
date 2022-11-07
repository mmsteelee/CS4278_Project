import React from 'react'
// //import { Link } from "react-router-dom";
import NavBar from '../../components/NavBar-component/NavBar.js'
import Header from '../../components/header-component/header.js'
import Logout from '../../components/logout-component/logout.js'

import './links.css'

const Links = () => {
    return (
      <div>
        <div className= "main-wrapper">
          
          <div className='links'>
          <table>
            <thead> Want to further connect with us? Click on the links below!</thead>
            <tbody>
              <tr>
                <a href="https://groupme.com/join_group/88408537/MKZan3OD"> GROUPME </a>
                <a href="https://docs.google.com/spreadsheets/d/1EDIrVz3ZESnqif_Kfs86KTd_whF9-cg_210EIRAJ2dU/edit"> PRACTICE SIGNUPS </a>
                <a href="https://www.instagram.com/vandyrunclub/?hl=en"> INSTAGRAM </a>
                <a href="https://anchorlink.vanderbilt.edu/organization/runningclub"> ANCHORLINK </a>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
    );
  };
    
  export default Links;