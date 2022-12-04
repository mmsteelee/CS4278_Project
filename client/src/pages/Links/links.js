import React from 'react'
import {useNavigate} from 'react-router-dom';
import Button from '@material-ui/core/Button';

import './links.css'

const Links = () => {

  const navigate = useNavigate();

  const openGroupMe = () => {
    window.open('https://groupme.com/join_group/88408537/MKZan3OD', '_blank');
  }

  const practiceSignups = () => {
    window.open('https://docs.google.com/spreadsheets/d/1EDIrVz3ZESnqif_Kfs86KTd_whF9-cg_210EIRAJ2dU/edit', '_blank');
  }

  const Instagram = () => {
    window.open('https://www.instagram.com/vandyrunclub/?hl=en', '_blank');
  }

  const AnchorLink = () => {
    window.open('https://anchorlink.vanderbilt.edu/organization/runningclub', '_blank');
  }

  return (
 
    <div className='links'>
      <table>
        <thead>
          <h1 className="connect">Want to further connect with us?</h1>
          <h1 className="linksBelow">Click on the links below!</h1>
        </thead>
        <tbody>
          <tr>
            <Button onClick={openGroupMe}>GROUPME</Button>
            <Button onClick={Instagram}>INSTAGRAM</Button>
            <Button onClick={practiceSignups}>PRACTICE SIGNUPS</Button>
            <Button onClick={AnchorLink}>ANCHORLINK</Button>
          </tr>
        </tbody>
      </table>
    </div>
    );
  };
    
  export default Links;