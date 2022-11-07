import React from 'react'
// //import { Link } from "react-router-dom";
import './calendar.css';

const Calendar = () => {
    return (
      <div>
        <div className= "calendar">
        <iframe src ="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&showTitle=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&showDate=1&showNav=1&title=Run%20Club%20Events&src=dnVydW5jbHViYXBwbGljYXRpb25AZ21haWwuY29t&src=MjY0MGJlOWJjZDM5YmRjYjgxNDZhMTUwOGEyZDFmNGY3MGQxYzgxMzQ1ZDBkZDlhOTkzOWRmMmRjYmZmNTg2Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%237986CB&color=%230B8043"  width="900" height="500" frameborder="0" scrolling="no">
            </iframe>
      </div>
    </div>
  
    );
  };
    
  export default Calendar;