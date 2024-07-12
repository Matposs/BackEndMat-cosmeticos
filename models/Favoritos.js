const mongoose = require("mongoose");

const itemFavoritoSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    produtoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produto",
        required: [true, "O ID do produto é obrigatório"]
    }
});

module.exports = itemFavoritoSchema;

