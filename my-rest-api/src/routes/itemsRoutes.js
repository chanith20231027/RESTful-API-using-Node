const express = require('express');
const router = express.Router();
const {createItem} = require('../controllers/itemsController');

router.post('/', createItem);

module.exports = router;