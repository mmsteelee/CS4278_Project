import React from "react";
// import {Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
// import'../styles/index.css';
import '../NavBar-component/navbar.css';


const NavBar = () => {
  return (
    <div className = "navbar">
      <div className = "text">
        <a href="/meettheteam">Meet The Team</a>
        <a href="/findyourrun">Find Your Run</a>
        <a href="/links">Links</a>
      </div>
    </div>


  //   <div className="navbar">
  // <nav class="navbar navbar-expand-lg navbar-light bg-light">
  //   <Link to="/">Welcome to Vandy Run Club </Link>
      
  //       {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  //         <span class="navbar-toggler-icon"></span>
  //       </button> */}
  //       <div class="collapse navbar-collapse" id="navbarNav">
  //         <ul class="navbar-nav">
  //           <li class="nav-item">
            
  //           <Link to="/meettheteam"> Meet The Team </Link>
  //           {/* <a href="/meettheteam"> Meet the Team </a> */}
        
  //           </li>
  //           <li class="nav-item">
  //           <Link to="/findyourrun"> Find Your Run </Link>
           
  //           </li>
  //           <li class="nav-item">
  //           <Link to="/links">Links</Link>
          
  //           </li>
  //         </ul>
  //       </div>
  //     </nav>
  //   </div>



  )

  
}

export default NavBar

