import React from 'react'
// //import { Link } from "react-router-dom";
import './calendar.css';

const Calendar = () => {
    return (
      <div>
        <div className= "calendar">
        <iframe src ="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&showTitle=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&showDate=1&showNav=1&title=Run%20Club%20Events&src=dnVydW5jbHViYXBwbGljYXRpb25AZ21haWwuY29t&src=MjY0MGJlOWJjZDM5YmRjYjgxNDZhMTUwOGEyZDFmNGY3MGQxYzgxMzQ1ZDBkZDlhOTkzOWRmMmRjYmZmNTg2Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%237986CB&color=%230B8043"  width="900" height="700" frameborder="0" scrolling="no">
            </iframe>
      </div>
    </div>
  
    );
  };
    
  export default Calendar;

// import { useState } from 'react';
// import Calendar from 'react-calendar';
// import './calendar.css';

// const Schedule = () => {
//  // Array to store month string values
//  const allMonthValues = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December"
// ];

// // State for date selected by user
// const [selectedDate, setSelectedDate] = useState();

// // State for text above calander
// const [calendarText, setCalendarText] = useState(`No Date is selected`);

// // Function to update selected date and calander text
// const handleDateChange = (value) => {
//   setSelectedDate(value);
//   setCalendarText(`The selected Date is ${value.toDateString()}`);
// };

// // Function to handle selected Year change
// const handleYearChange = (value) => {
//   const yearValue = value.getFullYear();
//   setCalendarText(`${yearValue} Year  is selected`);
// };

// // Function to handle selected Month change
// const handleMonthChange = (value) => {
//   const monthValue = allMonthValues[value.getMonth()];
//   setCalendarText(`${monthValue} Month  is selected`);
// };

// return (
//   <div className="app">
//     <h2 className="calander-details">{calendarText}</h2>
//     <Calendar
//       onClickMonth={handleMonthChange}
//       onClickYear={handleYearChange}
//       onChange={handleDateChange}
//       value={selectedDate}
//     />
//   </div>
// );
// }

// export default Schedule;
