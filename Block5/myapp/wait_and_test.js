const { execFile } = require('child_process');
const path = require('path');

// Warte 2 Sekunden bis Server bereit ist
setTimeout(() => {
  console.log('\n🧪 Starte Tests...\n');
  
  // Nutze execFile statt spawn (funktioniert besser auf Windows)
  const newmanPath = path.join(__dirname, 'node_modules', 'newman', 'bin', 'newman.js');
  
  const newman = execFile('node', [newmanPath, 'run', 'postman_collection.json', '--reporters', 'cli'], {
    cwd: __dirname,
    stdio: 'inherit'
  }, (error, stdout, stderr) => {
    if (error) {
      console.log('\n❌ Fehler beim Ausführen der Tests\n');
      process.exit(1);
    } else {
      console.log('\n✅ Alle Tests bestanden!\n');
      process.exit(0);
    }
  });

}, 2000);