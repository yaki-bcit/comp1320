const celToFah = (celsius) => {
  let celsiusToFahrenheit = Math.round((celsius * 9) / 5 + 32);
  let result =
    celsius +
    " degrees celsius is " +
    celsiusToFahrenheit +
    " degrees fahrenheit";
  return result;
};

const fahToCel = (fahrenheit) => {
  let fahrenheitToCelsius = Math.round(((parseInt(fahrenheit) - 32) * 5) / 9);
  let result =
    fahrenheit +
    " degrees fahrenheit is " +
    fahrenheitToCelsius +
    " degrees celsius";
  return result;
};

module.exports = { celToFah, fahToCel };
