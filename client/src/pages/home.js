import React from 'react'
import '../styles/home.css'

import Header from '../components/Header'


// import CustomButton from '../../components/custom-button/custom-buttom.component'
// import ContactForm from '../../components/contact-form/contact-form.component'
// import Gallery from '../../components/gallery/gallery.component'
// import {Link as Anchor} from 'react-scroll'


const HomePage = () => {
    // const scrollOffset = -1*window.innerHeight*.1

    return(
     <div className="site-wrapper">

      <div className="site-wrapper-inner">

        <div className="container">
        {/* <Header/> */}
        
          {/* <div className="masthead clearfix">
            <div className="container inner">
              <h3 className="masthead-brand">Cover</h3>
              <nav>
                <ul className="nav masthead-nav">
                  <li className="active"><a href="#">Home</a></li>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Find a Run</a></li>
                </ul>
              </nav>
            </div>
          </div> */}

          <div className="inner cover">
            <h1 className="cover-heading">Welcome to the Vandy Run Club</h1>
            <p className="lead">Check the calendar below for upcoming events!</p>
            <p className="lead">  </p>
                <div>
                <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&src=dnVydW5jbHViYXBwbGljYXRpb25AZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=MjY0MGJlOWJjZDM5YmRjYjgxNDZhMTUwOGEyZDFmNGY3MGQxYzgxMzQ1ZDBkZDlhOTkzOWRmMmRjYmZmNTg2Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%237986CB&color=%230B8043" 
                /*style={{border:solid 1px #777,
                 width:"800",
                  height:"600",
                   frameborder:"0",
                    scrolling:"no"}}*/></iframe>
                </div>
              {/* <a href="#" className="btn btn-lg btn-default">Learn more</a> */}
           
          </div>

        </div>

      </div>

    </div>
    )
}

export default HomePage;


