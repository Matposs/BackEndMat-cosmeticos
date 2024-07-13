const express = require('express');
const produtosRoutes = require('./produtosRoutes.js');
const usuariosRoutes = require('./usuariosRoutes.js');
const rotasProtegidas = require('./protected.js');
const favoritosRoutes = require('./favoritos.js');
const ordenarRoutes = require('./ordenarRoutes.js');

const router = express.Router();

router.use('/produtos', produtosRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/protected', rotasProtegidas);
router.use('/favoritos', favoritosRoutes);
router.use('/ordenar', ordenarRoutes);

module.exports = router;
