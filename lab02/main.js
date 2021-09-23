const labTwo = require('./lab-two');
const calendar = labTwo.listCalendar('2021');

console.log(calendar);

const userDayOfWeek = function getDayOfTheWeekForUserDate() {
  const readlineSync = require('readline-sync');
  let year = null;
  let month = null;
  let day = null;
  while (!(Number(year) > 0)) {
    year = readlineSync.question('Please enter the year (a positive number): ');
    
  }

  const currentYearStructure = labTwo.yearStructure(year);
  while (!(month in currentYearStructure)) {
    month = readlineSync.question('Please enter the month (January, February etc.): ');
  }

  while (!((Number(day) > 0) && (Number(day) <= currentYearStructure[month]))) {
    day = readlineSync.question("Please enter the day of the month (a realistic positive number): ");
  }

  const result = labTwo.dayOfWeek(year, month, day);
  return result;
};

const interactionResult = userDayOfWeek();
console.log(interactionResult);
