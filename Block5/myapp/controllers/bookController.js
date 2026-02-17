const Book = require('../models/book');
const { validateBook, validateBookPatch } = require('../utils/validation');

const getAllBooks = (req, res) => {
    res.status(200).json(Book.getAllBooks());
};

const getByIsbn = (req, res) => {
    const isbn = parseInt(req.params.isbn);
    const book = Book.getBookByIsbn(isbn);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
};

const postBook = (req, res) => {
    const { title, year, author } = req.body;

    if (!validateBook(title, year, author)) {
        return res.status(422).json({ error: 'Title, year, and author cannot be empty' });
    }

    const newBook = Book.addBook(title, year, author);
    res.status(201).json(newBook);
};

const putBook = (req, res) => {
    const isbn = parseInt(req.params.isbn);
    const { title, year, author } = req.body;

    if (!validateBook(title, year, author)) {
        return res.status(422).json({ error: 'Title, year, and author cannot be empty' });
    }

    const updatedBook = Book.updateBook(isbn, title, year, author);
    if (updatedBook) {
        res.status(200).json(updatedBook);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
};

const deleteBook = (req, res) => {
    const isbn = parseInt(req.params.isbn);
    if (Book.deleteBook(isbn)) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
};

const patchBook = (req, res) => {
    const isbn = parseInt(req.params.isbn);
    const updates = req.body;

    const validation = validateBookPatch(updates);
    if (!validation.valid) {
        return res.status(422).json({ error: validation.error });
    }

    const updatedBook = Book.patchBook(isbn, updates);
    if (updatedBook) {
        res.status(200).json(updatedBook);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
};

module.exports = {
    getAllBooks,
    getByIsbn,
    postBook,
    putBook,
    deleteBook,
    patchBook
};