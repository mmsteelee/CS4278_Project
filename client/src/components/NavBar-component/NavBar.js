<<<<<<< HEAD
import React, {useState} from "react";
=======
import React, {useContext, useState} from "react";
// import {Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
// import'../styles/index.css';
>>>>>>> f4cc39a2ebd8d9913cca5e21e65f757d96222b4b
import '../NavBar-component/navbar.css';
import Button from '@material-ui/core/Button';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import AdminPopup from "./AdminPopup";
import { UserContext } from "../../App";


const NavBar = ({handleClick}) => {
  const {user} = useContext(UserContext)

  const [showLinks, setShowLinks] = useState(false);
  const [openPopup, setOpenPopup] = useState(false)

  return (
    <div className = "navbar">
      <div className="left-side">
        <a href="/">VANDERBILT RUN CLUB</a> 
      </div>
      <div className="right-side">
        <div className = "text" id={showLinks ? "hidden" : ""}>
          <a href="/calendar">SCHEDULE</a>
          <a href="/meettheteam">MEET THE TEAM</a>
          <a href="/find">FIND YOUR RUN</a>
          <a href="/links">LINKS</a>
          <Button onClick={handleClick}>Logout</Button>
          {user.role === 'admin' && 
            <Button onClick={() => setOpenPopup(true)}>Admin</Button>
          }
        </div>
        <div className = "dropdown-button">
          <Button onClick={()=> setShowLinks(!showLinks)}>Menu<KeyboardArrowDown /></Button>
        </div>
      </div>
      {user.role === 'admin' &&
      <AdminPopup 
        message={'Admin Info'}
        open={openPopup}
        handleClose={() => {setOpenPopup(false)}}
      />
      }
    </div>
  )
}

export default NavBar

