import React from 'react'
import './home.style.css'


// import CustomButton from '../../components/custom-button/custom-buttom.component'
// import ContactForm from '../../components/contact-form/contact-form.component'
// import Gallery from '../../components/gallery/gallery.component'
// import {Link as Anchor} from 'react-scroll'

const HomePage = () => {
    // const scrollOffset = -1*window.innerHeight*.1

    return(
     <div class="site-wrapper">

      <div class="site-wrapper-inner">

        <div class="container">

          <div class="masthead clearfix">
            <div class="container inner">
              <h3 class="masthead-brand">Cover</h3>
              <nav>
                <ul class="nav masthead-nav">
                  <li class="active"><a href="#">Home</a></li>
                  {/* add links to the other pages here */}
                  <li><a href="#">About</a></li>
                  <li><a href="#">Find a Run</a></li>
                  <li><a href="#">Add a Run</a></li>
                </ul>
              </nav>
            </div>
          </div>

          <div class="inner cover">
            <h1 class="cover-heading">Welcome to the Vady Run Club</h1>
            <p class="lead">Check the calendar below for upcoming events!</p>
            <p class="lead">
                <div>
                <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&src=dnVydW5jbHViYXBwbGljYXRpb25AZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=MjY0MGJlOWJjZDM5YmRjYjgxNDZhMTUwOGEyZDFmNGY3MGQxYzgxMzQ1ZDBkZDlhOTkzOWRmMmRjYmZmNTg2Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%237986CB&color=%230B8043" style="border:solid 1px #777" width="800" height="600" frameborder="0" scrolling="no"></iframe>
                </div>
              {/* <a href="#" class="btn btn-lg btn-default">Learn more</a> */}
            </p>
          </div>

        </div>

      </div>

    </div>
    )
}

export default HomePage;



//homepage from previous years group:
   // <div className="homepage">
        //     <div className="page" id="home">
        //         <h1>Vanderbilt Running Club</h1>
        //         <br />
        //         <div className="btn-grp">
        //             <Anchor
        //                 to='about'
        //                 smooth={true}
        //                 duration={1000}
        //                 offset={scrollOffset}
        //             >
        //                 <CustomButton>About</CustomButton>
        //             </Anchor>
        //             {/* <Anchor
        //                 to='calendar'
        //                 smooth={true}
        //                 duration={1000}
        //                 offset={scrollOffset}
        //             >
        //                 <CustomButton>Contact Us</CustomButton>
        //             </Anchor> */}
        //         </div>
        //     </div>
        //     <div className="page" id="about">
        //         <div className="about-text">
        //             <h2>About Us</h2>
        //             <p>
        //                 VUClassSearch is a web platform built to help connect Vanderbilt University students with their classmates. Our mission is to forge relationships between peers to increase the exposure of information pertinent to students' success. 
        //             </p>
        //             <p>
        //                 Students can register using their Vanderbilt email and begin by adding a course to their schedule. They may navigate to the course page for each of their classes where they will be able to see a list of students also enrolled in their section of that course. Furthermore, students can create or join a GroupMe for their course so that they may more easily communicate with their peers.
        //             </p>
        //             <p>To view upcoming events: 
        //             <Anchor
        //                 className="scroll-link"
        //                 to='calendar'
        //                 smooth={true}
        //                 duration={1000}
        //                 offset={scrollOffset}
        //             >
        //             {"Calendar"}
        //             </Anchor></p>
                    
        //         </div>
        //         {/* <Gallery/> */}
        //     </div>
        //     <div className="page" id="calendar">
        //     <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&src=dnVydW5jbHViYXBwbGljYXRpb25AZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=MjY0MGJlOWJjZDM5YmRjYjgxNDZhMTUwOGEyZDFmNGY3MGQxYzgxMzQ1ZDBkZDlhOTkzOWRmMmRjYmZmNTg2Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%237986CB&color=%230B8043" style="border:solid 1px #777" width="800" height="600" frameborder="0" scrolling="no"></iframe>
        //     </div>
        // </div>

