const mongoose = require("mongoose");

const enderecoSchema = new mongoose.Schema({
    rua: {
        type: String,
        required: [true, "A rua é obrigatória"]
    },
    numero: {
        type: String,
        required: [true, "O número é obrigatório"]
    },
    cidade: {
        type: String,
        required: [true, "A cidade é obrigatória"]
    },
    estado: {
        type: String,
        required: [true, "O estado é obrigatório"]
    },
    cep: {
        type: String,
        required: [true, "O CEP é obrigatório"]
    }
});

const enderecos = mongoose.model("endereco", enderecoSchema);

module.exports = enderecos;