const fs = require('fs');

const file = fs.readFileSync(process.argv[2]);
const contents = file.toString();

const lines = contents.split('\n').length - 1;

console.log(lines);
