import React, { useContext, useEffect, useState } from 'react'
// //import { Link } from "react-router-dom";
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
        
        { loading ?  
          <LoadingAnimation />
          :
          <div className='container' >
            <div className='pageCover'>
              <h1>MEET THE TEAM!</h1>  
            </div>
      
            {bios.map(bio => <Bio
              key={bio}
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