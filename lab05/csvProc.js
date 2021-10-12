const fs = require('fs');

const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
};

const saveFile = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data.toString(), 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
};

const makeMenuStructure = (csv) => {
  let menuStructure = {};
  let textLines;
  if (csv.includes('\r\n')) { // split by line depending on new line chars used
    textLines = csv.split('\r\n');
  } else if (csv.includes('\r')) {
    textLines = csv.split('\r');
  } else if (csv.includes('\n')) {
    textLines = csv.split('\n');
  } else {
    return new Error('Bad file format.');
  }
  
  const taxCoefficient = 1.8;
  for (let row = 0; row < textLines.length; row++) {
    if ((textLines[row].length === 0) || (textLines[row] === ',,,')) continue; // skip empty rows
    let splitLine = textLines[row].split(','); // split line by column
    if (Buffer.from(splitLine[0]).toString('hex').startsWith('efbbbf')) { // check for BOM
      splitLine[0] = splitLine[0].slice(1); // remove BOM
    }

    splitLine[3] = '$' + (Number(splitLine[3].slice(1)) * taxCoefficient).toFixed(2); // apply tax
    const mealType = splitLine[0];
    if (!(mealType in menuStructure)) {
      menuStructure[mealType] = []; // create keys if absent
    }
    
    menuStructure[mealType].push(splitLine.slice(1)); // add menu lines to corresponding mealType
  }
  return menuStructure;
}

const niceTextFormat = (csv) => {
  let formattedMenuList = '';
  const menuStructure = makeMenuStructure(csv);
  for (const [mealType, mealLines] of Object.entries(menuStructure)) {
    menuStructure[mealType].sort(); // sort menu items alphabetically
    capitalizedMealType = mealType[0].toUpperCase() + mealType.slice(1);
    formattedMenuList += `* ${capitalizedMealType} Items *\n`; // meal type title
    for (let line = 0; line < mealLines.length; line++) {
      const price = mealLines[line][2];
      const name = mealLines[line][0];
      const quantity = mealLines[line][1];
      formattedMenuList += `${price}  ${name}, ${quantity}\n`; // menu item line
    }

    formattedMenuList += '\n'; // empty line between meal type sections
  }
  
  formattedMenuList = formattedMenuList.slice(0, -2); // remove trailing empty lines
  return formattedMenuList;
};

readFile('./menus/meals1.csv')
  .then(fileContent => niceTextFormat(fileContent))
  .then(menu => saveFile(('./menus/meals_' + Date.now() + '.txt'), menu))
  .catch(err => console.log(err));
