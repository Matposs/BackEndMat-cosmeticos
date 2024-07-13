const express = require('express');
const router = express.Router();
const ordenarController = require('../controllers/ordenarController.js');

router.get('/', ordenarController.ordenarProdutos);

module.exports = router;