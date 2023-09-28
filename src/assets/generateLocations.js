const fs = require('fs');

let startTime = performance.now();

const numberOfLocations = 15000;
const path = `./${numberOfLocations}-locations.json`;
const originalLocations = require(path);
const getRandomInRange = (from, to, fixed) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

while (originalLocations.length < numberOfLocations) {
  const lat = getRandomInRange(-180, 180, 3);
  const lng = getRandomInRange(-180, 180, 3);
  const title = `Location ${originalLocations.length + 1}`;
  originalLocations.push({ title, position: { lat, lng }, id: `${originalLocations.length + 1}`});
}

fs.writeFileSync(path, JSON.stringify(originalLocations, null, 2));

let endTime = performance.now();

let elapsedTime = endTime - startTime;
console.log(`Execution time: ${elapsedTime} ms`);
