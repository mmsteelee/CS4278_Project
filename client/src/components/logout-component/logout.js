import React from 'react';
import Button from '@material-ui/core/Button';

const Logout = ({handleClick}) => {
    return (
      <div className = "logout">
          <Button onClick={handleClick} color="primary">
            Logout
          </Button>
      </div>
    )
}

export default Logout