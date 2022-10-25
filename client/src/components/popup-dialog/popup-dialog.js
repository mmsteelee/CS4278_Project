import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const PopUpDialog = ({message, open, handleClose}) => {
  return (
    <div className='yes-no-dialog'>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Take Me There!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopUpDialog;