const fs = require('fs').promises;

function leseDateiInhalt(filepath) {
    return fs.readFile(filepath, 'utf8')
}

leseDateiInhalt('test.txt')
  .then(inhalt => { console.log('Die Länge des Dateiinhalts beträgt:', inhalt.length, inhalt);
})
  .catch(err => { console.error('Fehler beim Lesen der Datei:', err);
});