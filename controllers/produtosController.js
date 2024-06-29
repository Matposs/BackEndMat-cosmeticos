const Produto = require("../models/Produto.js");

async function createProduto(req, res) {
    try {
        const novoProduto = new Produto(req.body);
        await novoProduto.save();
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function getProdutos(req, res) {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function getProdutoById(req, res) {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function getProdutosByCategoria(req, res) {
    try {
        const produtos = await Produto.find({ categoria: req.params.categoria });
        if (!produtos.length) return res.status(404).json({ message: 'Nenhum produto encontrado para esta categoria' });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

async function updateProduto(req, res) {
    try {
        const produtoAtualizado = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!produtoAtualizado) return res.status(404).json({ message: 'Produto não encontrado' });
        res.status(200).json(produtoAtualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function deleteProduto(req, res) {
    try {
        const produtoDeletado = await Produto.findByIdAndDelete(req.params.id);
        if (!produtoDeletado) return res.status(404).json({ message: 'Produto não encontrado' });
        res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    createProduto,
    getProdutos,
    getProdutoById,
    getProdutosByCategoria,
    updateProduto,
    deleteProduto
};