const mongoose = require("mongoose");

const itemCarrinhoSchema = new mongoose.Schema({
    idProduto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "produtos",
        required: [true, "O ID do produto é obrigatório"]
    },
    quantidade: {
        type: Number,
        required: [true, "A quantidade é obrigatória"],
        min: [1, "A quantidade mínima é 1"]
    }
});

const carrinho = mongoose.model("carrinho", itemCarrinhoSchema);
module.exports = carrinho;