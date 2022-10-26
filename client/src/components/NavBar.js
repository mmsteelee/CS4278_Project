import React from "react";
// import {Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <Link to="/">Welcome to Vandy Run Club </Link>
      
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
            <Link to="/meettheteam"> Meet The Team </Link>
        
            </li>
            <li class="nav-item">
            <Link to="/findyourrun"> Find Your Run </Link>
           
            </li>
            <li class="nav-item">
            <Link to="/links">          Links</Link>
          
            </li>
          </ul>
        </div>
      </nav>
    //</div>
  )
}

export default NavBar

