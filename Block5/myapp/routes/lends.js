const express = require('express');
const lendController = require('../controllers/lendController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, lendController.getAllLends);
router.get('/:id', requireAuth, lendController.getLendById);
router.post('/', requireAuth, lendController.postLend);
router.delete('/:id', requireAuth, lendController.deleteLend);

module.exports = router;