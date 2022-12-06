import React, { useContext, useEffect, useState } from 'react'
// //import { Link } from "react-router-dom";
import Bio from '../../components/Bio/bio';
import NewBioPopup from '../../components/Bio/popup';
import LoadingAnimation from '../../components/loading-animation/loading-animation';

import { getBios } from '../../api/bios';

import { UserContext } from '../../App';
import './meetTheTeam.css'

import Create from '@material-ui/icons/Create';

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
      <div className= "total-wrapper">
 
        { loading ?  
          <LoadingAnimation />
          :
          <div className='main-wrapper' >
            <div className='pageCover'>
              <h1>MEET Our Exec Board!</h1>  
            </div>
            
            
            <div className='bios'>
            {bios.map(bio => <Bio
              key={bio._id}
              bio={bio}
            />)}
            </div>

            <div className='add-bio-button'>
              {
                user.role === 'admin' &&
                <button onClick={() => setopenNewBio(true)}><Create />Add New Bio</button>
              }
            </div>

           
            <NewBioPopup 
              message={'Add New Exec Member Bio'}
              open={openNewBio}
              handleClose={() => {setopenNewBio(false)}}
            />
          </div>
        }
      </div>

   
    );
  };
    
  export default MeetTheTeam;