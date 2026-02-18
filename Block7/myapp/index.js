const express = require('express');
const app = express();
const port = 3000;

// ====== CODE FOR BASIC AUTHENTICATION ======

function basicAuth(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Restricted Area');
        return res.status(401).send('Authentication required.');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    if (username === 'zli' && password === 'zli1234') {
        next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Restricted Area"');
        return res.status(401).send('Unauthorized');
    }
}


// ====== ENDPOINTS ======

app.get('/public', (req, res) => {
res.status(200).send('This is a public endpoint accessible to everyone.');
});

app.get('/private', basicAuth, (req, res) => {
    res.status(200).send('This is a private endpoint accessible only to authenticated users.');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});