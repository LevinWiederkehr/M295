let lends = [
    { id: 1, customerId: 101, isbn: 1, borrowedAt: '2026-02-10T10:00:00Z', returnedAt: null },
    { id: 2, customerId: 102, isbn: 2, borrowedAt: '2026-02-12T14:30:00Z', returnedAt: '2026-02-15T09:00:00Z' }
];

const getAllLends = () => lends;

const getLendById = (id) => lends.find(l => l.id === id);

const addLend = (customerId, isbn) => {
    const newLend = {
        id: lends.length > 0 ? Math.max(...lends.map(l => l.id)) + 1 : 1,
        customerId,
        isbn,
        borrowedAt: new Date().toISOString(),
        returnedAt: null
    };
    lends = [...lends, newLend];
    return newLend;
};

const returnLend = (id) => {
    const lendIndex = lends.findIndex(l => l.id === id);
    if (lendIndex !== -1) {
        lends = lends.map((lend, index) =>
            index === lendIndex ? { ...lend, returnedAt: new Date().toISOString() } : lend
        );
        return lends[lendIndex];
    }
    return null;
};

const isBookAlreadyBorrowed = (isbn) => lends.some(l => l.isbn === isbn && l.returnedAt === null);

const getCustomerOpenLends = (customerId) => lends.filter(l => l.customerId === customerId && l.returnedAt === null);

module.exports = {
    getAllLends,
    getLendById,
    addLend,
    returnLend,
    isBookAlreadyBorrowed,
    getCustomerOpenLends
};