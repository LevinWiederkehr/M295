const http = require('http');
const fs = require('fs');

const port = Number(process.argv[2]);
const filePath = process.argv[3];

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(filePath);
  stream.pipe(res); // Dateiinhalt direkt an Response streamen

  stream.on('error', err => {
    res.statusCode = 500;
    res.end('Fehler beim Lesen der Datei.');
    console.error(err);
  });
});

server.listen(port);
