import React, {createContext, useEffect, useState}  from 'react'
import {Routes , Navigate, Route} from 'react-router-dom'
import { useCookies } from 'react-cookie';

// import Header from './components/Header'
import HomePage from './pages/home'
import Auth from './pages/Auth/Auth'

import PopUpDialog from './components/popup-dialog/popup-dialog';
import LoadingAnimation from './components/loading-animation/loading-animation';

import {user as tokenLogin, exp} from './api/auth'

export const UserContext = createContext(null)
export const CookieContext = createContext(null)

export default function App() {
  const [user, setUser] = useState(null)
  const [cookies, setCookie] = useCookies(['name'])
  const [openDialog, setOpenDialog]   = useState(false)
  const [loading, setLoading]         = useState(true)
  
  useEffect(() => {
    // fetch user information if token still stored in cookies
    async function auth(){
      await tokenLogin()
        .then(resUser => setUser(resUser.data))
        .catch(err => console.log("ERROR: ", err.json))    
    }
    if (cookies.token) 
      auth()
    setTimeout(() => setLoading(false), 1000) 
  }, [])

  useEffect(()=>{
    async function timeout(){
      await exp()
        .then(res => {
          console.log(res.data)
          setTimeout(() => setOpenDialog(true), res.data.exp*1000 + 1000)})
        .catch(err => console.log(err))
    }
    timeout()
  }, [user])

  function logout() {
    setUser(null)
    setOpenDialog(false)
  }

  return (
    <div className='App'>
      <CookieContext.Provider value={{cookies, setCookie}}>
      <UserContext.Provider value={{user, setUser}}>
        { loading ? 
          <LoadingAnimation /> :
          <Routes>
            <Route exact path="/auth" element={<Auth/>}></Route>
            <Route exact path="/" element={user ? <HomePage/> : <Navigate to="/auth"/>}></Route>
          </Routes>
        }
        <PopUpDialog
          message={`Session Expired. Please log back in.`} 
          open={openDialog}
          handleClose={logout}
        />
      </UserContext.Provider>
      </CookieContext.Provider>
    </div>
  )
}