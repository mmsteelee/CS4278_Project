import React from 'react'
import '../styles/home.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import { ReactEmbeddedGoogleCalendar } from 'react-embedded-google-calendar'
import NavBar from '../components/NavBar-component/NavBar.js'
import Header from '../components/header-component/header'
// import Navigation from '../components/NavBar.js'

// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';


// import CustomButton from '../../components/custom-button/custom-buttom.component'
// import ContactForm from '../../components/contact-form/contact-form.component'
// import Gallery from '../../components/gallery/gallery.component'
// import {Link as Anchor} from 'react-scroll'


const HomePage = () => {

  return (
    <div>
      <div class= "main-wrapper">
        
        {/* <Header></Header> */}
        {/* <NavBar/> */}
        <div className="main-section">
          <h1 className="cover-heading">Welcome to the Vandy Run Club!</h1>
          {/* <p className="check-text">Check the calendar below for upcoming events!</p> */}
          <div className="calendar">
          
          </div>
        </div>
      </div>
     </div>
  )
}

export default HomePage;


