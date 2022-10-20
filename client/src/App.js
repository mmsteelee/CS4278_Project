import {useAuth} from './contexts/AuthContext'
// import Header from './components/Header'

//import CreateARun from './pages/create';
// import FindARun from './pages/find';
// import FindYourRun from './pages/FindYourRun';
import HomePage from './pages/home'
import Links from './pages/links'
// import MeetTheTeam from './pages/meetTheTeam';


//import {Link} from "react-router-dom";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";



// export default function App() {
//   //const {isLoggedIn} = useAuth()

//   return (
//     <div className='App'>
//       <HomePage/>
//     </div>
//   )
// }

function App() {
  return (
    <>
    <div className='App'>
      <HomePage/>
    </div>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
      
          {/* <Route exact path="/" component={MeetTheTeam} /> */}
          <Route path="/about" component={Links} />
          {/* <Route path="/contactus" component={FindYourRun} /> */}
            
          <Navigate to="/" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
  
