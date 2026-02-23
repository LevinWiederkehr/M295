const express = require('express');
const router = express.Router();

const VALID_EMAIL    = process.env.AUTH_EMAIL    || 'test@test.com';
const VALID_PASSWORD = process.env.AUTH_PASSWORD || 'm295';

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        req.session.authenticated = true;
        req.session.email = email;
        return res.status(201).json({ email });
    }

    return res.status(401).json({ error: 'Ungültige Credentials.' });
});

router.get('/verify', (req, res) => {
    if (req.session && req.session.authenticated) {
        return res.status(200).json({ email: req.session.email });
    }
    return res.status(401).json({ error: 'Nicht authentifiziert.' });
});

router.delete('/logout', (req, res) => {
    req.session.authenticated = false;
    req.session.email = null;
    return res.status(204).send();
});

module.exports = router;