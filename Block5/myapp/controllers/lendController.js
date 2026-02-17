const Lend = require('../models/lend');
const Book = require('../models/book');
const { validateLendInput } = require('../utils/validation');

const getAllLends = (req, res) => {
    res.status(200).json(Lend.getAllLends());
};

const getLendById = (req, res) => {
    const id = parseInt(req.params.id);
    const lend = Lend.getLendById(id);
    if (lend) {
        res.status(200).json(lend);
    } else {
        res.status(404).json({ error: 'Lend not found' });
    }
};

const postLend = (req, res) => {
    const { customerId, isbn } = req.body;

    if (!validateLendInput(customerId, isbn)) {
        return res.status(422).json({ error: 'customerId and isbn are required and cannot be empty' });
    }

    if (!Book.getBookByIsbn(isbn)) {
        return res.status(422).json({ error: 'Book with this isbn does not exist' });
    }

    if (Lend.isBookAlreadyBorrowed(isbn)) {
        return res.status(422).json({ error: 'This book is already borrowed' });
    }

    const customerOpenLends = Lend.getCustomerOpenLends(customerId);
    if (customerOpenLends.length >= 3) {
        return res.status(422).json({ error: 'Customer has reached maximum of 3 open lends' });
    }

    const newLend = Lend.addLend(customerId, isbn);
    res.status(201).json(newLend);
};

const deleteLend = (req, res) => {
    const id = parseInt(req.params.id);
    const returnedLend = Lend.returnLend(id);
    if (returnedLend) {
        res.status(200).json(returnedLend);
    } else {
        res.status(404).json({ error: 'Lend not found' });
    }
};

module.exports = {
    getAllLends,
    getLendById,
    postLend,
    deleteLend
};