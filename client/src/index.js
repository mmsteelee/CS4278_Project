import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {GoogleOAuthProvider} from "@react-oauth/google"
import { CookiesProvider } from 'react-cookie' 
import CssBaseline from '@mui/material/CssBaseline'
import '@fontsource/roboto'
import './styles/index.css'

import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
      <GoogleOAuthProvider clientId='573133251068-e1fd6sb5g36l0ktfd5t8ok00kremvo9i.apps.googleusercontent.com'>
      <CookiesProvider>
        <CssBaseline />
        <App />
      </CookiesProvider>
      </GoogleOAuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
