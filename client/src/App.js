import {useAuth} from './contexts/AuthContext'
// import Header from './components/Header'
import HomePage from './pages/home'

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom";

export default function App() {
  //const {isLoggedIn} = useAuth()

  return (
    <div className='App'>
      <HomePage/>
    </div>
  )
}