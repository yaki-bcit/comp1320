const dayOfWeek = function getDayOfTheWeek(year, month, day) {
  const monthCodeList = {
    'January': 1,
    'February': 4,
    'April': 0,
    'May': 2,
    'June': 5,
    'July': 0,
    'August': 3,
    'September': 6,
    'October': 1,
    'November': 4,
    'December': 6,
  };
  const dayOfWeekDictionary = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', ]
  let yearHundreds = Number(year.slice(0, -2));
  let monthKeyCorrection = 2 * (3 - (yearHundreds % 4));
  let monthCode = monthCodeList[month] + monthKeyCorrection;
  
  if (leapYear(year) && (month == 'January' || month == 'February')) {
    monthCode -= 1;
  };

  let yearLastTwoDigits = Number(year.slice(-2));
  let numberOfTwelves = Math.trunc(yearLastTwoDigits / 12);
  let remainder = yearLastTwoDigits % 12;
  let numOfFoursInRemainder = Math.trunc(remainder / 4);
  let dayOfWeekKey = (numberOfTwelves + remainder + numOfFoursInRemainder + Number(day) + monthCode) % 7;
  let dayOfWeek = dayOfWeekDictionary[dayOfWeekKey];
  return dayOfWeek;
};

const leapYear = function isLeapYear(year) {
  /**
  * assuming we're working with the Gregorian calendar in common era
  * see https://en.wikipedia.org/wiki/Leap_year#Algorithm
  */  
  year = Number(year);
  if (!(year % 4 == 0)) {
    return false;
  } else if (!(year % 100 == 0)) {
    return true;
  } else if (!(year % 400 == 0)) {
    return false;
  } else return true;
};

const yearStructure = function makeYearStructure(year) {
  const leapAddition = Number(leapYear(year));
  const monthLength = {
    'January': 31, // number of days in the month
    'February': 28 + leapAddition,
    'March': 31,
    'April': 30,
    'May': 31,
    'June': 30,
    'July': 31,
    'August': 31,
    'September': 30,
    'October': 31,
    'November': 30,
    'December': 31,
  };
  return monthLength;
};

const listCalendar = function makeCalendar(year) {
  let monthLength = yearStructure(year);
  let calendar = '';
  for (const month in monthLength) {
    for (let index = 0; index < monthLength[month]; index++) {
      let day = String(index + 1);
      let dayName = dayOfWeek(year, month, day);
      calendar += `${month} ${day}, ${year} is ${dayName}\n`;
    }
  }
  return calendar;
};

module.exports = { dayOfWeek , listCalendar, yearStructure };
