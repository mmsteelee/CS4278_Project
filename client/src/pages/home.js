import React from 'react'
import '../styles/home.css'
import Button from '@material-ui/core/Button';
import {useNavigate} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'

const HomePage = () => {

  const navigate = useNavigate();

  const navigateToMeetTheTeam = () => {
    navigate('/meettheteam');
  }
  const navigateToFind = () => {
    navigate('/find');
  }
  const navigateToSchedule = () =>  {
    navigate('calendar');
  }

  return (
    <div>
      <div class= "main-wrapper">
        <div className="main-section">
          <h1 className="cover-heading">WELCOME TO THE VANDY RUN CLUB</h1>
          <h1 className="come-run">Come run with us. No experience required.</h1>
          <div className="meet-exec">
            <Button onClick={navigateToFind}>Ready to Start Running?</Button>
            <Button onClick={navigateToMeetTheTeam}>Meet Our Exec Board!</Button>
            <Button onClick={navigateToSchedule}>Look at our schedule!</Button>
          </div>
        </div>
      </div>
     </div>
  )
}

export default HomePage;


