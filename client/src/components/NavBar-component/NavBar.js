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
      </div>

      <div className="right-side">
        <div className = "text" id={showLinks ? "hidden" : ""}>
          <a href="/calendar">SCHEDULE</a>
          <a href="/meettheteam">MEET THE TEAM</a>
          <a href="/findyourrun">FIND YOUR RUN</a>
          <a href="/links">LINKS</a>
          <Button onClick={handleClick}>Logout</Button>
        </div>
        <div className = "dropdown-button">
          <Button onClick={()=> setShowLinks(!showLinks)}>Open</Button>
        </div>
     
      </div>
    </div>
  )
}

export default NavBar

