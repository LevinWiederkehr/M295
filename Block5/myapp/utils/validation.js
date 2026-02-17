const validateBook = (title, year, author) => {
    if (!title || !year || !author || title.trim() === '' || author.trim() === '') {
        return false;
    }
    return true;
};

const validateBookPatch = (updates) => {
    if (updates.title !== undefined && (typeof updates.title !== 'string' || updates.title.trim() === '')) {
        return { valid: false, error: 'Title must be a non-empty string' };
    }
    if (updates.year !== undefined && (typeof updates.year !== 'number' || updates.year <= 0)) {
        return { valid: false, error: 'Year must be a positive number' };
    }
    if (updates.author !== undefined && (typeof updates.author !== 'string' || updates.author.trim() === '')) {
        return { valid: false, error: 'Author must be a non-empty string' };
    }
    return { valid: true };
};

const validateLendInput = (customerId, isbn) => {
    if (!customerId || !isbn) {
        return false;
    }
    return true;
};

module.exports = {
    validateBook,
    validateBookPatch,
    validateLendInput
};