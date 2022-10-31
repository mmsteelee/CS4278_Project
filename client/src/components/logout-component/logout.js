import React, {useState} from "react";
import LogoutDialog from "./logout-dialog";
// import { useCookies } from 'react-cookie';
// import React, {createContext, useEffect, useState}  from 'react'
// import { useContext, useState } from "react";



const Logout = () => {

  const [user, setUser] = useState(null)
  const [openDialog, setOpenDialog]   = useState(false)

  function logout() {
    setUser(null)
    setOpenDialog(false)
  }

    return (
      <div className = "logout">
        <div className = "text">
          <a href="/auth/logout">Logout</a>
        </div>
        <LogoutDialog
          message={`Session Expired. Please log back in.`} 
          open={openDialog}
          handleClose={logout}
        />
      </div>
    )
}

export default Logout