# Learn You Node.js – Übungen 2 bis 10

## Erkenntnisse pro Aufgabe

- **Übung 2 – Baby Steps:**  
  Kommandozeilenargumente (`process.argv`) liefern Eingaben; Strings müssen ggf. zu Zahlen konvertiert werden.

- **Übung 3 – My First I/O:**  
  Synchrones Lesen von Dateien mit `fs.readFileSync()`; einfache Verarbeitung von Dateiinhalt.

- **Übung 4 – My First Async I/O:**  
  Asynchrone Funktionen erfordern Callbacks; Programm wartet nicht automatisch auf das Ergebnis.

- **Übung 5 – Filtered LS:**  
  Asynchrones Einlesen eines Verzeichnisses mit `fs.readdir()`; Filterung nach Dateiendung.

- **Übung 6 – Make It Modular:**  
  Eigene Module (`module.exports`) verbessern Wiederverwendbarkeit; Callback-Konvention `(err, data)` beachten.

- **Übung 7 – HTTP Client:**  
  Streams von HTTP-Antworten liefern Daten stückweise (`data` Events); `setEncoding('utf8')` wandelt Buffer in Strings.

- **Übung 8 – HTTP Collect:**  
  Gesamte Daten sammeln über mehrere `data` Events, erst am `end` Event ausgeben.

- **Übung 9 – Juggling Async:**  
  Mehrere asynchrone Requests gleichzeitig starten; Ergebnisse müssen in **originaler Reihenfolge** gespeichert werden.

- **Übung 10 – Time Server:**  
  TCP-Server mit `net.createServer()` erstellen; Daten an jeden Client schreiben und Verbindung schliessen; Datum formatieren mit zero-padding.

---

## Reflexion

Die grössten Herausforderungen lagen darin, die asynchrone Abläufe korrekt zu steuern.  
Bei mehreren HTTP-Requests (Übung 9) kamen die Antworten in zufälliger Reihenfolge, sodass ein Array mit Indexspeicherung nötig war, um die richtige Reihenfolge zu wahren.  

Insgesamt wurde mir klar, dass Node.js stark event-getrieben und asynchron ist, und das richtiges Handling von Callbacks essenziell sind.
