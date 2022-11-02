import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { addNewBio } from '../../api/bios';

const NewBioPopup = ({message, open, handleClose}) => {
  const [fname, setfname] = useState('')
  const [femail, setfemail] = useState('')
  const [ftitle, setftitle] = useState('')
  const [ftext, setftext] = useState('')
  const [isValid, setValid] = useState(false)

  const validate = () => {
    return fname.length && femail.length && ftitle.length && ftext.length
  }

  useEffect(() => {
    const isValid = validate();
    setValid(isValid);
  }, [fname, femail, ftitle, ftext]);


  const handleSubmit = () => {
    let bio ={
        name: fname,
        email: femail,
        title: ftitle,
        text: ftext
    } 

    addNewBio(bio)
        .then(res => console.log(res))
        .catch(err => console.log(err))
  }
  
  return(
    <div className='new-bio-popup'>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
        <DialogActions>
            <form onSubmit={handleSubmit}>
            <input type='text' name='name' placeholder='Name' onChange={e => setfname(e.target.value)}/>
            <input type='text' name='title' placeholder='Exec Title' onChange={e => setftitle(e.target.value)}/>
            <input type='text' name='text' placeholder='Bio' onChange={e => setftext(e.target.value)}/>
            <input type='text'  name='email' placeholder='Email' onChange={e => setfemail(e.target.value)}/>
            <Button type='Submit' disabled={!isValid}>Submit</Button>
            </form>
            <Button onClick={handleClose}>
                Close
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewBioPopup;