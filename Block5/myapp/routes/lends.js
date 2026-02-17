const express = require('express');
const lendController = require('../controllers/lendController');

const router = express.Router();

router.get('/', lendController.getAllLends);
router.get('/:id', lendController.getLendById);
router.post('/', lendController.postLend);
router.delete('/:id', lendController.deleteLend);

module.exports = router;