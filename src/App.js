import { useState } from "react";
import "./styles.css";

export default function App() {
  var [data,setdata] = useState('');
  var [output,setoutput] = useState('Your result will be shown here');
  var [show, setShow] = useState("none");

  function changehandler(e){
    setdata(e.target.value)
  }

  function handleHowBtnClick() {
    var showStyle = show === "none" ? "block" : "none";
    setShow(showStyle);
  }

  function ToString(date){
    var dateInStr = { day: '', month: '', year: '' };
    if (date.day < 10) {
      dateInStr.day = '0' + date.day;
    }
    else {
      dateInStr.day = date.day.toString();
    }
    if (date.month < 10) {
      dateInStr.month = '0' + date.month;
    }
    else {
      dateInStr.month = date.month.toString();
    }
    dateInStr.year = date.year.toString();
    return dateInStr;
  }

  function reverseString(str) {
    var listOfChars = str.split('');
    var reversedListOfChar = listOfChars.reverse();
    var reversedString = reversedListOfChar.join('');
    return reversedString;
  }

  function isStringPalindrome(str) {
    var reversedString = reverseString(str);
    return str === reversedString;
  }

  function DateAllFormats(date){
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  }

  function checkDateAllFormats(date) {
    var dateFormatList = DateAllFormats(date);
    var palindromeList = [];
  
    for (var i = 0; i < dateFormatList.length; i++) {
      var result = isStringPalindrome(dateFormatList[i]);
      palindromeList.push(result);
    }
    return palindromeList;
  }

  function isLeapYear(year) {

    if (year % 400 === 0)
      return true;
  
    if (year % 100 === 0)
      return false;
  
    if (year % 4 === 0)
      return true;
  
    return false;
  }
  
  function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      }
      else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    }
    else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
  }
  
  function getNextPalindromeDate(date) {
    var nextDate = getNextDate(date);
    let ctr = 0;
    while (1) {
      ctr++;
      var dateStr = ToString(nextDate);
      var resultList = checkDateAllFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, nextDate];
        }
      }
      nextDate = getNextDate(nextDate);
    }
  }

  function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (day === 0) {
      month--;
  
      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      }
      else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        }
        else {
          day = 28;
        }
      }
      else {
        day = daysInMonth[month - 1];
      }
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
  }

  function getPreviousPalindromeDate(date) {
    var previousDate = getPreviousDate(date);
    var ctr = 0;
  
    while (1) {
      ctr++;
      var dateStr = ToString(previousDate);
      var resultList = checkDateAllFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, previousDate];
        }
      }
      previousDate = getPreviousDate(previousDate);
    }
  }

  function clickhandler(value){
    if ( value !== '') {
      var date = value.split('-');
      var yyyy = date[0];
      var mm = date[1];
      var dd = date[2];
  
      date = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yyyy)
      };
  
      var dateStr = ToString(date);
      var list = checkDateAllFormats(dateStr);
      var isPalindrome = false;
  
      for (let i = 0; i < list.length; i++) {
        if (list[i]) {
          isPalindrome = true;
          break;
        }
      }
  
      if (!isPalindrome) {
        const [ctr1, nextDate] = getNextPalindromeDate(date);
        const [ctr2, prevDate] = getPreviousPalindromeDate(date);
  
        if (ctr1 > ctr2) {
          setoutput(`The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days.`);
        } else {
          setoutput(`The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`);
        }
  
      } else {
        setoutput('Yay! Your birthday is palindrome!');
      }
    }
  }

  return (
    <div className="container">
        <h1> Birthdate Palindrome</h1>
        <div className="title">
          <h1> <span>😎</span> Want to know is your birthdate palindrome. . .</h1>
          <a href="#secondpage">Checkout Now</a>
        </div>
      
      <div id="secondpage">
        <div className="elements">
        <div id="alertBox">
          <div className="privacy">
                <strong>Privacy Notice!</strong> We are not storing your data.
          </div>
        </div>

        <div className="description">
          <button className="btn" onClick={handleHowBtnClick}>
            Click know how it works
          </button>
          <p style={{ display: `${show}` }}>
            This app checks your birthdate in 6 formats dd-mm-yyyy, mm-dd-yy,
            yyyy-mm-dd, mm-dd-yy, dd-mm-yy, yy-mm-dd. <br></br>
            If your birthdate is 01 Aug 1995, then app will check for 01081995,
            08011995, 19950801, 080195, 010895, and 950801.
          </p>
        </div>

        <h2>Enter Your birthdate below</h2>
        <input  onChange={e=>changehandler(e)} type="date" display nonerequired/>
        <button onClick={e=>clickhandler(data)}>Check</button>
        <div className="display">{output}</div>
        </div>
      </div>

      <footer id="footer">
                <ul className="footer-list">
                    <li className="list-item"><a target="_blank" href="bhosalesiddhesh9@gmail.com" className="footer-links">
                        <i className="fa fa-envelope" aria-hidden="true"></i></a>
                    </li>
                    <li className="list-item"><a href="https://github.com/Siddheshbhosale">
                        <i className="fab fa-github" aria-hidden="true"></i>
                    </a>
                    </li>
                    <li className="list-item"><a href="https://www.linkedin.com/in/siddheshbhosale">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    </li>
                    <li className="list-item"><a href="https://github.com/Siddheshbhosale" >
                        <i className="fas fa-briefcase"></i>
                    </a>
                    </li>
                </ul>
            </footer> 
    </div>
  );
}
