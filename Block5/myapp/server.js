const express = require('express');
const bookRoutes = require('./routes/books');
const lendRoutes = require('./routes/lends');

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use('/books', bookRoutes);
app.use('/lends', lendRoutes);

app.listen(port, () => {
    console.log(`Bibliothek app listening on port ${port}`);
});