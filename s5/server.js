/* 
Create a seperate file on here called temperature converter. 
Put the following functions into that file and export them. Import them here.
function celToFah(celsius) {
  let celsiusToFahrenheit = Math.round((celsius * 9) / 5 + 32);
  let result =
    celsius +
    " degrees celsius to " +
    celsiusToFahrenheit +
    " degrees fahrenheit";
  console.log(result);
}

function fahToCel(fahrenheit) {
  let fahrenheitToCelsius = Math.round(((parseInt(fahrenheit) - 32) * 5) / 9);
  let result =
    fahrenheit +
    " degrees fahrenheit to " +
    fahrenheitToCelsius +
    " degrees celsius";
  console.log(result);
}
Use these functions to return back to the user an html page containing the result.

Visit the page localhost:8125/temperatures to see the form
 */

const http = require("http");
const fs = require("fs");
const url = require('url');
const path = require("path");

const tempConv = require('./tempConverter.js');

http
  .createServer(function (request, response) {
    console.log("request ", request.url);

    let filePath = "." + request.url;
    if (filePath == "./") {
      filePath = "./index.html";
    }

    // FIX THIS PART ⭐️
    // HINT: https://nodejs.org/en/knowledge/HTTP/clients/how-to-access-query-string-parameters/

    const query = url.parse(request.url,true).query;
    if (filePath.includes("/submit")) {
      response.writeHead(404, { "Content-Type": "text/html" });
      const inputScale = query.temperature.slice(-1);
      const inputTemp = parseInt(query.temperature);
      if (inputScale === 'c') {
        const result = tempConv.celToFah(inputTemp);
        response.write(result);
      } else if (inputScale === 'f') {
        const result = tempConv.fahToCel(inputTemp);
        response.write(result);
      } else {
        response.write(`<h1> Wrong temperature scale. Please try again. Use "c" or "f".</h1>`)
      }

      response.end(
        "<p>Thank you for checking out the temperature converter! Click here to go back: <a href='/temperatures.html'>Go back</p>"
      );
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".wav": "audio/wav",
      ".mp4": "video/mp4",
      ".woff": "application/font-woff",
      ".ttf": "application/font-ttf",
      ".eot": "application/vnd.ms-fontobject",
      ".otf": "application/font-otf",
      ".wasm": "application/wasm",
    };

    const contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, function (error, content) {
      if (error) {
        if (error.code == "ENOENT") {
          fs.readFile("./404.html", function (error, content) {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end(content, "utf-8");
          });
        } else {
          response.writeHead(500);
          response.end(
            "Sorry, check with the site admin for error: " +
              error.code +
              " ..\n"
          );
        }
      } else {
        response.writeHead(200, { "Content-Type": contentType });
        response.end(content, "utf-8");
      }
    });
  })
  .listen(8125, () => {
    console.log("Server running at http://127.0.0.1:8125/");
  });
