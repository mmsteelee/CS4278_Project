import React from 'react'
import '../styles/home.css'
import Button from '@material-ui/core/Button';
import {useNavigate} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'


// import Navigation from '../components/NavBar.js'

// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';


// import CustomButton from '../../components/custom-button/custom-buttom.component'
// import ContactForm from '../../components/contact-form/contact-form.component'
// import Gallery from '../../components/gallery/gallery.component'
// import {Link as Anchor} from 'react-scroll'


const HomePage = () => {

  const navigate = useNavigate();

  const navigateToMeetTheTeam = () => {
    navigate('/meettheteam');
  }

  return (
    <div>
      <div class= "main-wrapper">
        <div className="main-section">
          <h1 className="cover-heading">WELCOME TO THE VANDY RUN CLUB</h1>
          <h1 className="come-run">Come run with us. No experience required.</h1>
          <div className="meet-exec">
            <Button onClick={navigateToMeetTheTeam}>Meet Our Exec Board</Button>
          </div>
        </div>
      </div>
     </div>
  )
}

export default HomePage;


