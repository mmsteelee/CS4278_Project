import React from "react";
// import {Nav, Navbar, NavLink } from "react-bootstrap";
// import { Link } from "react-router-dom";



const NavBar = () => {
  return (
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Welcome to Vandy Run Club</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">Meet the Team</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Find Your Run</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Links</a>
            </li>
          </ul>
        </div>
      </nav>
    //</div>
  )
}

// const Navbar = () => {
//     return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//           <a className="navbar-brand" href="#">Navbar</a>
//           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav">
//               <li className="nav-item active">
//                 <a className="nav-link" href="#">Meet the Team <span class="sr-only">(current)</span></a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">Features</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">Pricing</a>
//               </li>
//             </ul>
//           </div>
//         </nav>
//       //</div>
//     )
// }

// const Navigation = () => {
//   return (
//       <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
//           <Navbar.Toggle aria-controls="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//               <Nav>
               
//                   <NavLink  eventKey="1" as={Link} to="/links">Links</NavLink>
//                   {/* <NavLink  eventKey="2" as={Link} to="/about">About</NavLink>
//                   <NavLink  eventKey="3" as={Link} to="/contact">Contact</NavLink> */}
//               </Nav>
//           </Navbar.Collapse>     
//       </Navbar>
//   );
// }


export default NavBar

