const express = require('express');
const produtosRoutes = require('./produtosRoutes.js');
const usuariosRoutes = require('./usuariosRoutes.js');
const rotasProtegidas = require('./protected.js');
const favoritosRoutes = require('./favoritos.js');

const router = express.Router();

router.use('/produtos', produtosRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/protected', rotasProtegidas);
router.use('/favoritos', favoritosRoutes);

module.exports = router;
