const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
    { isbn: 1, title: 'The Great Gatsby', year: 1925, author: 'F. Scott Fitzgerald' },
    { isbn: 2, title: 'To Kill a Mockingbird', year: 1960, author: 'Harper Lee' },
    { isbn: 3, title: '1984', year: 1948, author: 'George Orwell' }
];

function validateBook(title, year, author) {
    if (!title || !year || !author || title.trim() === '' || author.trim() === '') {
        return false;
    }
    return true;
}

function handleGetAllBooks(req, res) {
    res.status(200).json(books);
}

function handleGetByIsbn(req, res) {
    const isbn = parseInt(req.params.isbn);
    const book = books.find(b => b.isbn === isbn);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
}

function handlePostBook(req, res) {
    const { title, year, author } = req.body;

    if (!validateBook(title, year, author)) {
        return res.status(422).json({ error: 'Title, year, and author cannot be empty' });
    }

    const newBook = {
        isbn: books.length > 0 ? Math.max(...books.map(b => b.isbn)) + 1 : 1,
        title,
        year,
        author
    };
    // books.push(newBook);
    books = [...books, newBook];
    res.status(201).json(newBook);
}

function handlePutBook(req, res) {
    const isbn = parseInt(req.params.isbn);
    const { title, year, author } = req.body;
    
    if (!validateBook(title, year, author)) {
        return res.status(422).json({ error: 'Title, year, and author cannot be empty' });
    }    

    const bookIndex = books.findIndex(b => b.isbn === isbn);
    if (bookIndex !== -1) {
        books = books.map((book, index) =>
            index === bookIndex ? { isbn, title, year, author } : book
        );
        res.status(200).json(books[bookIndex]);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
}

function handleDeleteBook(req, res) {
    const isbn = parseInt(req.params.isbn);
    const bookIndex = books.findIndex(b => b.isbn === isbn);
    if (bookIndex !== -1) {
        // books.splice(bookIndex, 1);
        books = books.filter((_, index) => index !== bookIndex);
        res.status(204).json({ message: 'Book deleted successfully' });
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
}

function handlePatchBook(req, res) {
    const isbn = parseInt(req.params.isbn);
    const updates = req.body;

    if (updates.title !== undefined && (typeof updates.title !== 'string' || updates.title.trim() === '')) {
        return res.status(422).json({ error: 'Title must be a non-empty string' });
    }
    if (updates.year !== undefined && (typeof updates.year !== 'number' || updates.year <= 0)) {
        return res.status(422).json({ error: 'Year must be a positive number' });
    }
    if (updates.author !== undefined && (typeof updates.author !== 'string' || updates.author.trim() === '')) {
        return res.status(422).json({ error: 'Author must be a non-empty string' });
    }

    const bookIndex = books.findIndex(b => b.isbn === isbn);
    // if (bookIndex !== -1) {
        // books[bookIndex] = { isbn, title, year, author };
        // res.status(200).json(books[bookIndex]);
        if (bookIndex !== -1) {
            books = books.map((book, index) => 
            index === bookIndex ? { ...book, ...updates } : book
        );
        res.status(200).json(books[bookIndex]);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
};

app.get('/books', handleGetAllBooks);

app.get('/books/:isbn', handleGetByIsbn);

app.post('/books', handlePostBook);

app.put('/books/:isbn', handlePutBook);

app.delete('/books/:isbn', handleDeleteBook);

app.patch('/books/:isbn', handlePatchBook);

app.listen(port, () => {
    console.log(`Bibliothek app listening on port ${port}`);
});