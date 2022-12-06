import React, {useContext, useState} from "react";
// import {Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
// import'../styles/index.css';
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
          <a href="/meettheteam">MEET THE TEAM</a>
          <a href="/find">FIND YOUR RUN</a>
          <a href="/links">LINKS</a>
          {user.role === 'admin' && 
            <Button onClick={() => setOpenPopup(true)}>Admin</Button>
          }
          <Button onClick={handleClick}>Logout</Button>
          
        </div>
        <div className = "dropdown-button">
          <Button onClick={()=> setShowLinks(!showLinks)}>Menu<KeyboardArrowDown /></Button>
        </div>
      </div>
      <div className="admin-button">
        {user.role === 'admin' &&
        <AdminPopup 
          message={'Admin Info'}
          open={openPopup}
          handleClose={() => {setOpenPopup(false)}}
        />
        }
      </div>
    </div>
  )
}

export default NavBar

