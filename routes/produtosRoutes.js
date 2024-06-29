const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

router.post('/', produtosController.createProduto);
router.get('/', produtosController.getProdutos);
router.get('/:id', produtosController.getProdutoById);
router.get('/categoria/:categoria', produtosController.getProdutosByCategoria);
router.put('/:id', produtosController.updateProduto);
router.delete('/:id', produtosController.deleteProduto);

module.exports = router;