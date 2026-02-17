const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
    { isbn: 1, title: 'The Great Gatsby', year: 1925, author: 'F. Scott Fitzgerald' },
    { isbn: 2, title: 'To Kill a Mockingbird', year: 1960, author: 'Harper Lee' },
    { isbn: 3, title: '1984', year: 1948, author: 'George Orwell' }
];

let lends = [
    { id: 1, customerId: 101, isbn: 1, borrowedAt: '2024-01-01T10:00:00Z', returnedAt: '2024-01-15T10:00:00Z' },
    { id: 2, customerId: 102, isbn: 2, borrowedAt: '2024-02-01T10:00:00Z', returnedAt: null },
    { id: 3, customerId: 103, isbn: 3, borrowedAt: '2024-03-01T10:00:00Z', returnedAt: null }
]

// ==== LENDS FUNCTIONS ====

function validateLendInput(customerId, isbn) {
    if (!customerId || !isbn) {
        return false;
    }
    return true; 
}

function handleGetAllLends(req, res) {
    res.status(200).json(lends);
}

function handleGetLendById(req, res) {
    const id = parseInt(req.params.id);
    const lend = lends.find(l => l.id === id);
    if (lend) {
        res.status(200).json(lend);
    } else {
        res.status(404).json({ error: 'Lend not found' });
    }
}

function handlePostLend(req, res) {
    const { customerId, isbn } = req.body;

    if (!validateLendInput(customerId, isbn)) {
        return res.status(422).json({ error: 'Customer ID and ISBN are required' });
    }

    const bookExists = books.some(b => b.isbn === isbn);
    if (!bookExists) {
        return res.status(422).json({ error: 'Book with this isbn does not exist' });
    }

    const bookAlreadyLent = lends.some(l => l.isbn === isbn && l.returnedAt === null);
    if (bookAlreadyLent) {
        return res.status(422).json({ error: 'This book is already borrowed' });
    }

    const customerOpenLends = lends.filter(l => l.customerId === customerId && l.returnedAt === null);
    if (customerOpenLends.length >= 3) {
        return res.status(422).json({ error: 'Customer has reached maximum of 3 open lends' });
    }

    const newLend = {
        id: lends.length > 0 ? Math.max(...lends.map(l => l.id)) + 1 : 1,
        customerId,
        isbn,
        borrowedAt: new Date().toISOString(),
        returnedAt: null
    };
    lends = [...lends, newLend];
    res.status(201).json(newLend);
}

function handleDeleteLend(req, res) {
    const id = parseInt(req.params.id);
    const lendIndex = lends.findIndex(l => l.id === id);
    if (lendIndex !== -1) {
        lends = lends.map((lend, index) =>
            index === lendIndex ? { ...lend, returnedAt: new Date().toISOString() } : lend
        );
        res.status(200).json({ message: 'Lend marked as returned successfully' });
    } else {
        res.status(404).json({ error: 'Lend not found' });
    }
}

// ==== LENDS ENDPOINTS ====

app.get('/lends', handleGetAllLends);

app.get('/lends/:id', handleGetLendById);

app.post('/lends', handlePostLend);

app.delete('/lends/:id', handleDeleteLend);

// ==== BOOKS FUNCTIONS ====

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
        if (bookIndex !== -1) {
            books = books.map((book, index) => 
            index === bookIndex ? { ...book, ...updates } : book
        );
        res.status(200).json(books[bookIndex]);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
};

// ==== BOOKS ENDPOINTS ====

app.get('/books', handleGetAllBooks);

app.get('/books/:isbn', handleGetByIsbn);

app.post('/books', handlePostBook);

app.put('/books/:isbn', handlePutBook);

app.delete('/books/:isbn', handleDeleteBook);

app.patch('/books/:isbn', handlePatchBook);

app.listen(port, () => {
    console.log(`Bibliothek app listening on port ${port}`);
});