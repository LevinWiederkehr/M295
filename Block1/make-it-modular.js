const mymodule = require('./mymodule');

const dir = process.argv[2];
const ext = process.argv[3];

mymodule(dir, ext, function (err, list) {
  if (err) return console.error('Fehler:', err);

  list.forEach(file => console.log(file));
});
