const requireAuth = (req, res, next) => {
    if (req.session && req.session.authenticated) {
        return next();
    }
    return res.status(401).json({ error: 'Nicht authentifiziert. Bitte zuerst einloggen via POST /login.' });
};

module.exports = { requireAuth };