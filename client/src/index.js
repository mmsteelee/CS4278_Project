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
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <CookiesProvider>
        <CssBaseline />
        <App />
      </CookiesProvider>
      </GoogleOAuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
