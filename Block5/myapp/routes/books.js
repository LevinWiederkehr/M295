const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/:isbn', bookController.getByIsbn);
router.post('/', bookController.postBook);
router.put('/:isbn', bookController.putBook);
router.delete('/:isbn', bookController.deleteBook);
router.patch('/:isbn', bookController.patchBook);

module.exports = router;