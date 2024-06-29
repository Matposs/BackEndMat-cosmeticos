const express = require('express');
const produtosRoutes = require('./produtosRoutes.js');
const usuariosRoutes = require('./usuariosRoutes.js');

const router = express.Router();

router.use('/produtos', produtosRoutes);
// router.use('/usuarios', usuariosRoutes);

module.exports = router;
