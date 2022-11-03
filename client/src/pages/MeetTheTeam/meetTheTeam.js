import React, { useContext, useEffect, useState } from 'react'
// //import { Link } from "react-router-dom";
import NavBar from '../../components/NavBar-component/NavBar'
import Header from '../../components/header-component/header.js';
import Bio from '../../components/Bio/bio';
import NewBioPopup from '../../components/Bio/popup';
import LoadingAnimation from '../../components/loading-animation/loading-animation';

import { getBios } from '../../api/bios';

import { UserContext } from '../../App';
import './meetTheTeam.css'

const MeetTheTeam = () => {
    const [bios, setBios] = useState([])
    const [openNewBio, setopenNewBio] = useState(false)
    const [loading, setLoading] = useState(true)
    const {user} = useContext(UserContext)

    useEffect(()=>{
      getBios()
        .then(res => {setBios(res.data); setLoading(false)})
        .catch(err => console.log(err))
    }, [])

    return (
      <div className= "main-wrapper">
        <Header/>
        <NavBar/>
        { loading ?  
          <LoadingAnimation />
          :
          <div className='container' >
            <div className='pageCover'>

              <h1>Meet the Team</h1>  
            </div>
      
            {bios.map(bio => <Bio
              bio={bio}
            />)}
            {
              user.role === 'admin' &&
              <button onClick={() => setopenNewBio(true)}>Add New Bio</button>
            }
            <NewBioPopup 
              message={'Add Executive Team Bio'}
              open={openNewBio}
              handleClose={() => {setopenNewBio(false)}}
            />
          </div>
        }
      </div>
   
    );
  };
    
  export default MeetTheTeam;