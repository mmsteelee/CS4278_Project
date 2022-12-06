import React from 'react'
import '../styles/home.css'
import Button from '@material-ui/core/Button';
import {useNavigate} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'

const HomePage = () => {

  const navigate = useNavigate();

  const addCalendar = () => {
    window.open('https://calendar.google.com/calendar/u/2?cid=MjY0MGJlOWJjZDM5YmRjYjgxNDZhMTUwOGEyZDFmNGY3MGQxYzgxMzQ1ZDBkZDlhOTkzOWRmMmRjYmZmNTg2Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t', '_blank');
  }

  const navigateToMeetTheTeam = () => {
    navigate('/meettheteam');
  }
  const navigateToFind = () => {
    navigate('/find');
  }
  
  return (
    <div>
      <div >
        <div className="main-section">
          <h1 className="cover-heading">WELCOME TO THE VANDY RUN CLUB</h1>
          <h1 className="come-run">Come run with us. No experience required.</h1>
          <div className="meet-exec">
            <Button onClick={navigateToFind}>Ready to Start Running?</Button>
            <Button onClick={navigateToMeetTheTeam}>Meet Our Exec Board!</Button>
            <Button onClick={addCalendar}>Add our calendar to your gcal!</Button>
          </div>
        </div>
      </div>
     </div>
  )
}

export default HomePage;


