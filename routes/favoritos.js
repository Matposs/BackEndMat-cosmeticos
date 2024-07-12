const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const favoritosController = require('../controllers/favoritosController');

router.get('/', auth, favoritosController.getFavoritos);
router.post('/', auth, favoritosController.addFavorito);
router.delete('/:produtoId', auth, favoritosController.removeFavorito);
router.get('/:produtoId/isFavoritado', auth, favoritosController.isFavoritado);
router.get('/verify-token', auth, favoritosController.verifyToken);

module.exports = router;