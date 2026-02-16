# M295

# Node.js Spickzettel – Learn You Node.js Übungen 2–10

## 1. Kommandozeilenargumente

```javascript
// process.argv enthält alle Kommandozeilenparameter
console.log(process.argv);

// Beispiel: node script.js arg1 arg2
// argv[0] = 'node'
// argv[1] = 'script.js'
// argv[2] = 'arg1'
// argv[3] = 'arg2'
```

---

## 2. Zahlen summieren (Baby Steps)

```javascript
let sum = 0;
for (let i = 2; i < process.argv.length; i++) {
  sum += Number(process.argv[i]);
}
console.log(sum);
```

---

## 3. Dateien lesen

```javascript
const fs = require('fs');

// Synchron lesen
const data = fs.readFileSync('datei.txt', 'utf8');
console.log(data.split('\n').length - 1);

// Asynchron lesen
fs.readFile('datei.txt', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log(data.split('\n').length - 1);
});
```

---

## 4. Verzeichnisse lesen & filtern

```javascript
const path = require('path');

fs.readdir('./ordner', (err, list) => {
  if (err) return console.error(err);
  list.filter(file => path.extname(file) === '.txt')
      .forEach(file => console.log(file));
});
```

---

## 5. Module erstellen

```javascript
// mymodule.js
const fs = require('fs');
const path = require('path');

module.exports = function(dir, ext, callback) {
  fs.readdir(dir, (err, list) => {
    if (err) return callback(err);
    const filtered = list.filter(f => path.extname(f) === '.' + ext);
    callback(null, filtered);
  });
};

// make-it-modular.js
const mymodule = require('./mymodule');
mymodule('./ordner', 'txt', (err, list) => {
  if (err) return console.error(err);
  list.forEach(f => console.log(f));
});
```

---

## 6. HTTP GET Requests

```javascript
const http = require('http');

const url = process.argv[2];
http.get(url, response => {
  response.setEncoding('utf8');
  response.on('data', chunk => console.log(chunk));  // data-Events
  response.on('end', () => console.log('Fertig'));
});
```

---

## 7. HTTP Collect (gesamte Daten sammeln)

```javascript
let completeData = '';
http.get(url, res => {
  res.setEncoding('utf8');
  res.on('data', chunk => completeData += chunk);
  res.on('end', () => {
    console.log(completeData.length);
    console.log(completeData);
  });
});
```

---

## 8. Mehrere asynchrone Requests (Juggling Async)

```javascript
const urls = process.argv.slice(2);
const results = [];
let count = 0;

urls.forEach((url, i) => {
  http.get(url, res => {
    res.setEncoding('utf8');
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      results[i] = data;
      count++;
      if (count === urls.length) results.forEach(d => console.log(d));
    });
  });
});
```

---

## 9. TCP Server (Time Server)

```javascript
const net = require('net');

function zeroFill(i) { return (i < 10 ? '0' : '') + i; }
function formatDate(date) {
  return `${date.getFullYear()}-${zeroFill(date.getMonth()+1)}-${zeroFill(date.getDate())} ` +
         `${zeroFill(date.getHours())}:${zeroFill(date.getMinutes())}\n`;
}

const server = net.createServer(socket => {
  socket.end(formatDate(new Date()));
});

server.listen(Number(process.argv[2]));
```

---

## 10. Node.js Tipps & Patterns

- **Sync vs Async**
  - `fs.readFileSync()` → blockiert den Code  
  - `fs.readFile()` → asynchron, benutzt Callback `(err, data)`  
- **Callback-Konvention:** `(err, data)` → immer zuerst Fehler prüfen  
- **Streams**
  - `data` → Teilstücke vom Stream  
  - `end` → Stream fertig  
- **Module**
  - `module.exports = function(...) {}` → eigene Funktion exportieren  
  - `require('./mymodule')` → lokale Module laden  
- **HTTP**
  - `http.get(url, callback)` → GET-Request  
  - `setEncoding('utf8')` → Daten als String  
- **TCP Server**
  - `net.createServer(listener)` → TCP-Server  
  - `socket.end(data)` → senden + schließen

---

## 11. Reflexion

- **Asynchronität** ist zentral in Node.js → Callbacks, Streams und Events verstehen
- **Fehlerhandling** bei asynchronen Funktionen: frühzeitig returnen, Fehler an Callback weitergeben
- **Ergebnisse ordnen** → bei mehreren Requests muss die Reihenfolge gespeichert werden
- **Module** trennen Logik von Ausgabe, erhöhen Wiederverwendbarkeit

