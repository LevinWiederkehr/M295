const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(express.json());
app.use(session({
    secret: 'na-ihr-nudeln-hero',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.post('/name', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    req.session.name = name;
    res.json({ message: `Name ${name} has been stored in the session` });
});

app.get('/name', (req, res) => {
    const name = req.session.name;
    if (!name) {
        return res.status(404).json({ error: 'No name found in session' });
    }
    res.json({ name });
});

app.delete('/name', (req, res) => {
    if (!req.session.name) {
        return res.status(404).json({ error: 'No name found in session to delete' });
    }
    delete req.session.name;
    res.json({ message: 'Name has been deleted from the session' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});