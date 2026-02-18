const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bookRoutes = require('./routes/books');
const lendRoutes = require('./routes/lends');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/books', bookRoutes);
app.use('/lends', lendRoutes);

app.listen(port, () => {
    console.log(`Bibliothek app listening on port ${port}`);
});