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
        
        <Header></Header>
        <NavBar/>
        <div className="main-section">
          <h1 className="cover-heading">Welcome to the Vandy Run Club!</h1>
          <p className="check-text">Check the calendar below for upcoming events!</p>
          <div className="calendar">
            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&src=dnVydW5jbHViYXBwbGljYXRpb25AZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=MjY0MGJlOWJjZDM5YmRjYjgxNDZhMTUwOGEyZDFmNGY3MGQxYzgxMzQ1ZDBkZDlhOTkzOWRmMmRjYmZmNTg2Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%237986CB&color=%230B8043" height='600px' width='600px'>
            </iframe>
          </div>
        </div>
      </div>
     </div>
  )
}

export default HomePage;


