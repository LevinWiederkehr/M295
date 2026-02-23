const express = require('express');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bookRoutes = require('./routes/books');
const lendRoutes = require('./routes/lends');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'bibliothek-secret-2024',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60  // 1 Stunde
    }
}));
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/', authRoutes);
app.use('/books', bookRoutes);
app.use('/lends', lendRoutes);

app.listen(port, () => {
    console.log(`Bibliothek app listening on port ${port}`);
});