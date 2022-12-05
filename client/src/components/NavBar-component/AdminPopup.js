import { Button, Dialog, DialogActions, DialogTitle, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getAdmins, grantAdmin, revokeAdmin } from "../../api/admin";

const AdminPopup = ({message, open, handleClose}) => {
    const [admins, setAdmins] = useState([])
    const [femail, setfemail] = useState()

    useEffect(() => {
        getAdmins().then(
            res => {
                console.log(res)
                setAdmins(res.data.map(x => x.email))
            }
        )
    }, [])

    const handleGrant = () => {
        grantAdmin(femail)
    }

    const handleRevoke = () => {
        revokeAdmin(femail)
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
            <Typography type='h4'>Current Administrators:</Typography>
            {admins.map(email => 
                <Typography type='h5'>{email}</Typography>
            )}
            <DialogActions>
                <form onSubmit={handleGrant}>
                <input type='text' name='grant' placeholder='email' onChange={e => setfemail(e.target.value)}/>
                <Button type='Submit'>Grant</Button>
                </form>
                <form onSubmit={handleRevoke}>
                <input type='text' name='revoke' placeholder='email' onChange={e => setfemail(e.target.value)}/>
                <Button type='Submit'>Revoke</Button>
                </form>
            </DialogActions>
          </Dialog>
        </div>
      )
}

export default AdminPopup;