const express = require('express');
const app = express();
const port = 3000;

app.get('/now', (req, res) => {
        const currentTime = new Date().toLocaleString('de-CH', {timeZone : 'Europe/Zurich'});
        res.status(200).json({ time: currentTime });     
});

app.get('/zli', (req, res) => {
        const redirectUrl = 'https://www.zli.ch/';
        res.status(301).redirect(redirectUrl);   
});

app.get('/name', (req, res) => {
        const nameList = ['Levin', 'Luca', 'Noah', 'Leon', 'Elias', 'Mia', 'Emma', 'Sofia', 'Lina', 'Lea', 'Ben', 'Liam', 'Finn', 'Max', 'Anna', 'Laura', 'Sara', 'Nina', 'Lara', 'Emily'];
        const randomName = nameList[Math.floor(Math.random() * nameList.length)];
        res.status(200).json({ name: randomName });      
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

app.get('/xml', (req, res) => {
        const filePath = __dirname + '/public/data.xml';
        res.status(200).sendFile(filePath);     
});

app.get('/me', (req, res) => {
        const filePath = __dirname + '/public/data.json';
        res.status(200).sendFile(filePath);     
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});