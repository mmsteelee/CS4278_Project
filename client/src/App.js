import React, {createContext, useEffect, useState}  from 'react'
import {Routes , Navigate, Route} from 'react-router-dom'
import {api as axios} from './utils/axios'
import { useCookies } from 'react-cookie';

// import Header from './components/Header'
import HomePage from './pages/home'
import Auth from './pages/Auth/Auth'

export const UserContext = createContext(null)
export const CookieContext = createContext(null)

export default function App() {
  const [user, setUser] = useState(null)
  const [cookies, setCookie] = useCookies(['name'])
  
  useEffect(() => {
    console.log(cookies.token)
    async function auth(){
      await axios({
          method: "GET",
          url: "/auth/user",
          withCredentials: true
      })
      .then(resUser => setUser(resUser.data))
      .catch(err => console.log("ERROR: ", err.json))
    }
    auth()
  })

  return (
    <div className='App'>
      <CookieContext.Provider value={{cookies, setCookie}}>
      <UserContext.Provider value={{user, setUser}}>
        <Routes>
          <Route exact path="/auth" element={<Auth/>}></Route>
          <Route exact path="/" element={user ? <HomePage/> : <Navigate to="/auth"/>}></Route>
        </Routes>
      </UserContext.Provider>
      </CookieContext.Provider>
    </div>
  )
}