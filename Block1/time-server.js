const net = require('net');

function zeroFill(i) {
  return (i < 10 ? '0' : '') + i;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = zeroFill(date.getMonth() + 1); // Monat beginnt bei 0
  const day = zeroFill(date.getDate());
  const hour = zeroFill(date.getHours());
  const minute = zeroFill(date.getMinutes());

  return `${year}-${month}-${day} ${hour}:${minute}\n`;
}

const server = net.createServer(function (socket) {
  const now = new Date();
  socket.end(formatDate(now));
});

const port = Number(process.argv[2]);
server.listen(port);
