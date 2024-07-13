// ordenarController.js

const Produto = require('../models/Produto.js');

async function ordenarProdutos(req, res) {
    const { valorOrdenacao, categoria } = req.query;
    try {

        let listaDeProdutos = await Produto.find({ categoria });
        switch (valorOrdenacao) {
            case "menor-preco":
                listaDeProdutos = listaDeProdutos.sort((a, b) => (a.preco) - (b.preco));
                break;
            case "maior-preco":
                listaDeProdutos = listaDeProdutos.sort((a, b) => (b.preco) - (a.preco));
                break;
            case "a-z":
                listaDeProdutos = listaDeProdutos.sort((a, b) => (a.nome).localeCompare(b.nome));
                break;
            case "z-a":
                listaDeProdutos = listaDeProdutos.sort((a, b) => (b.nome).localeCompare(a.nome));
                break;
            default:
                break;
        }
        res.status(200).json(listaDeProdutos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao ordenar produtos' });
    }
}

module.exports = { ordenarProdutos };
