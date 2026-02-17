let books = [
    { isbn: 1, title: 'The Great Gatsby', year: 1925, author: 'F. Scott Fitzgerald' },
    { isbn: 2, title: 'To Kill a Mockingbird', year: 1960, author: 'Harper Lee' },
    { isbn: 3, title: '1984', year: 1948, author: 'George Orwell' }
];

const getAllBooks = () => books;

const getBookByIsbn = (isbn) => books.find(b => b.isbn === isbn);

const addBook = (title, year, author) => {
    const newBook = {
        isbn: books.length > 0 ? Math.max(...books.map(b => b.isbn)) + 1 : 1,
        title,
        year,
        author
    };
    books = [...books, newBook];
    return newBook;
};

const updateBook = (isbn, title, year, author) => {
    const bookIndex = books.findIndex(b => b.isbn === isbn);
    if (bookIndex !== -1) {
        books = books.map((book, index) =>
            index === bookIndex ? { isbn, title, year, author } : book
        );
        return books[bookIndex];
    }
    return null;
};

const deleteBook = (isbn) => {
    const bookIndex = books.findIndex(b => b.isbn === isbn);
    if (bookIndex !== -1) {
        books = books.filter((_, index) => index !== bookIndex);
        return true;
    }
    return false;
};

const patchBook = (isbn, updates) => {
    const bookIndex = books.findIndex(b => b.isbn === isbn);
    if (bookIndex !== -1) {
        books = books.map((book, index) =>
            index === bookIndex ? { ...book, ...updates } : book
        );
        return books[bookIndex];
    }
    return null;
};

module.exports = {
    getAllBooks,
    getBookByIsbn,
    addBook,
    updateBook,
    deleteBook,
    patchBook
};