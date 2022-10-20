import React from "react";
import { Link } from "react-router-dom";

window.React2 = require('react');
console.log(window.React1 === window.React2);

const Navbar = () => {
    return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">Vandy Run Club</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#">Links</a>
                {/* <Link to="/Links">Links</Link> */}
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Meet the Team</a>
                {/* <Link to="/MeetTheTeam">Meet the Team</Link> */}
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Find Your Run</a>
                {/* <Link to="/FindYourRun">Find Your Run</Link> */}
              </li>
            </ul>
          </div>
        </nav>
      //</div>
    )
}

export default Navbar