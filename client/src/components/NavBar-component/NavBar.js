import React, {useState} from "react";
// import {Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
// import'../styles/index.css';
import '../NavBar-component/navbar.css';
import Button from '@material-ui/core/Button';


const NavBar = ({handleClick}) => {

  const [showLinks, setShowLinks] = useState(false);
  return (
    <div className = "navbar">
      <div className="left-side">
        <a href="/">VANDERBILT RUN CLUB</a> 
        <Button>Open</Button>
      </div>
     
        <div className = "text">
          <a href="/calendar">SCHEDULE</a>
          <a href="/meettheteam">MEET THE TEAM</a>
          <a href="/findyourrun">FIND YOUR RUN</a>
          <a href="/links">LINKS</a>
          <Button onClick={handleClick}>
            Logout
          </Button>
       
        
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

