
function reversedString(str) {

    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
  
    var reversedString = reverseListOfChars.join('');
  
    return reversedString;
  
  }
  
 
  function isPalindrome(str) {
    var reversedStr = reversedString(str);
  
    return str === reversedStr;
  }
  
 
  function convertDateToStr(date) {
  
    var dateStr = { day: '', month: '', year: '' };
  
    if (date.day < 10) {
      dateStr.day = '0' + date.day;
    } else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = '0' + date.month;
    } else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
  
    return dateStr;
  
  }
  
  
  
  function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  
  function checkPalindromeForAllFormats(date) {
  
    var listOfPalindromes = getAllDateFormats(date);
  
    var isPalindromeFlag = false;
  
    for (var i = 0; i < listOfPalindromes.length; i++) {
  
      if (isPalindrome(listOfPalindromes[i])) {
        isPalindromeFlag = true;
  
        break;
      }
    }
  
    return isPalindromeFlag;
  }
  
 
  function isLeapYear(year) {
  
    if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
      return true;
    } else {
      return false;
    }
  
  }
  
  
 
  function getNextDate(date) {
    var day = date.day + 1;   
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11 index
  
 
    if (month === 2) {
     
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;  
        }
      }
      else {
        if (day > 28) {
          day = 1;
          month++;  
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
    };
  }
  
 
  function getNextPalindromeDate(date) {
    var counter = 0;
    var nextDate = getNextDate(date);
  
    while (1) {
      counter++;
      var isPalindrome = checkPalindromeForAllFormats(nextDate);
      if (isPalindrome) {
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];
  }
  
  var date = {
    day: 18,
    month: 02,
    year: 2002
  }
  
  var bdayInput = document.querySelector("#bday-input");
  var checkBtn = document.querySelector("#check-btn");
  
  var outPutDiv = document.querySelector("#output-div");
  
  checkBtn.addEventListener("click", clickHandler);
  
  function clickHandler(e) {
  
  
    var bdayStr = bdayInput.value;
  
    if (bdayStr !== '') {
      var arrOfDate = bdayStr.split('-');
  
      var date = {
        day: Number(arrOfDate[2]),
        month: Number(arrOfDate[1]),
        year: Number(arrOfDate[0])
      }
  
      var isPalindrome = checkPalindromeForAllFormats(date);
  
      if (isPalindrome) {
        outPutDiv.innerText = "It's a Palindrome Birthday!";
      } else {
        var [counter, nextDate] = getNextPalindromeDate(date);
  
        var dayString = counter>1 ? "days" : "day"; 
        
        outPutDiv.innerText = `The next Palindrome date is on ${nextDate.day} - ${nextDate.month} - ${nextDate.year}, you missed it by ${counter} `+dayString;
      }
    
    }
  
  
  }
  