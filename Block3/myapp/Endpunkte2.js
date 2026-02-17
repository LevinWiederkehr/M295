const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

let me = JSON.parse(fs.readFileSync(__dirname + '/public/data.json', 'utf-8'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());

const nameList = ['Levin', 'Luca', 'Noah', 'Leon', 'Elias', 'Mia', 'Emma', 'Sofia', 'Lina', 'Lea', 'Ben', 'Liam', 'Finn', 'Max', 'Anna', 'Laura', 'Sara', 'Nina', 'Lara', 'Emily'];

// http://localhost:3000/now?tz=Europe/Zurich
app.get('/now', (req, res) => { 
        const timeZone = req.query.tz;
        try {
                const currentTime = new Date().toLocaleTimeString('de-CH', {timeZone : timeZone});
                res.status(200).json({ time: currentTime, timezone: timeZone }); 
        } catch (error) {
                console.error('Fehler:', error);
                return res.status(400).json({ error: 'Ungültige Zeitzone' });
        }
            
});

app.get('/zli', (req, res) => {
        const redirectUrl = 'https://www.zli.ch/';
        res.status(301).redirect(redirectUrl);   
});

app.get('/name', (req, res) => {
        // const nameList = ['Levin', 'Luca', 'Noah', 'Leon', 'Elias', 'Mia', 'Emma', 'Sofia', 'Lina', 'Lea', 'Ben', 'Liam', 'Finn', 'Max', 'Anna', 'Laura', 'Sara', 'Nina', 'Lara', 'Emily'];
        const randomName = nameList[Math.floor(Math.random() * nameList.length)];
        res.status(200).json({ name: randomName });      
});

app.get('/names', (req, res) => {
        res.status(200).json({ names: nameList });     
});

app.post('/names', (req, res) => {
        const name = req.body.name;
        if (!name) {
                return res.status(400).json({ error: 'Name ist erforderlich'                        
                });
        }
        nameList.push(name);
        res.status(201).json({ message: 'Name hinzugefügt', name: name, names: nameList });
});

app.delete('/names', (req, res) => {
        const name = req.query.name;
        try {
                const index = nameList.indexOf(name);
                if (index === -1) {
                        return res.status(404).json({ error: 'Name nicht gefunden' });
                } else {
                        nameList.splice(index, 1);
                }
                res.sendStatus(204);
        } catch (error) {
                console.error('Fehler:', error);
                return res.status(400).json({ error: 'Ungültiger Name' });
        }
});

app.get('/chuck', async (req, res) => {
        const name = req.query.name;
        try {
                const response = (await fetch('https://api.chucknorris.io/jokes/random'));
                const joke = await response.json();
                const jokeValue = joke.value.replace(/Chuck Norris/gi, name);
                res.status(200).json({ joke: jokeValue });
        } catch (error) {
                console.error('Fehler:', error);
                return res.status(400).json({ error: 'Fehler beim Abrufen' });
        }
});


app.get('/html', (req, res) => {
        const filePath = __dirname + '/public/index.html';
        res.status(200).sendFile(filePath);     
});

app.get('/image', (req, res) => {
        const filePath = __dirname + '/public/image.jpg';
        res.status(200).sendFile(filePath);       
});

app.get('/teapot', (req, res) => {
        res.sendStatus(418);      
});

app.get('/user-agent', (req, res) => {
        const userAgent = req.headers['user-agent'];
        res.status(200).json({ userAgent: userAgent });     
});

app.get('/secret', (req, res) => {
        res.sendStatus(403);     
});

app.get('/secret2', (req, res) => {
        const Authorization = req.headers['authorization'];
        try {
                if (Authorization === 'Basic aGFja2VyOjEyMzQ=') {
                        res.status(200).json({ message: 'Zugriff gewährt' });
                } else {
                        res.sendStatus(401);
                }
        }
        catch (error) {
                console.error('Fehler:', error);
                return res.status(400).json({ error: 'Ungültiger Authorization Header' });
        };    
});



app.get('/xml', (req, res) => {
        const filePath = __dirname + '/public/data.xml';
        res.status(200).sendFile(filePath);     
});

app.get('/me', (req, res) => {
        res.status(200).json(me);     
});

app.patch('/me', async (req, res) => {
        const filePath = __dirname + '/public/data.json';
        const updates = req.body;

        if (!updates || typeof updates !== 'object') {
                return res.status(400).json({ error: 'Updates müssen ein Objekt sein'                       
                });
        }
        try {
                me = { ...me, ...updates };
                await fs.promises.writeFile(filePath, JSON.stringify(me, null, 2), 'utf-8');
                res.status(200).json({ message: 'Daten aktualisiert', me: me });
        } catch (error) {
                console.error('Fehler:', error);
                return res.status(500).json({ error: 'Fehler beim Aktualisieren der Daten' });
        }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});