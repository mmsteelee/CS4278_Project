import React, { useEffect, useState } from 'react'
// //import { Link } from "react-router-dom";
import NavBar from '../../components/NavBar-component/NavBar'
import Header from '../../components/header-component/header.js';
import Bio from '../../components/Bio/bio';
import NewBioPopup from '../../components/Bio/popup';

import { getBios } from '../../api/bios';

const MeetTheTeam = () => {
    const [bios, setBios] = useState([])
    const [openNewBio, setopenNewBio] = useState(false)

    useEffect(()=>{
      getBios()
        .then(res => setBios(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
      <div className= "main-wrapper">
        <Header/>
        <NavBar/>
        <div className='container'>
          <h1>Meet the Team</h1>  
          {bios.map(bio => <Bio
            bio={bio}
          />)}
          <button onClick={() => setopenNewBio(true)}>Add New Bio</button>
          <NewBioPopup 
            message={'Add Executive Team Bio'}
            open={openNewBio}
            handleClose={() => {setopenNewBio(false)}}
          />
        </div>
      </div>
   
    );
  };
    
  export default MeetTheTeam;