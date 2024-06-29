const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "O nome do produto é obrigatório"],
        },
        preco: {
            type: Number,
            required: [true, "O preço do produto é obrigatório"],
        },
        quantidade: {
            type: Number,
            required: [true, "A quantidade do produto é obrigatória"],
        },
        descricao: {
            type: String,
            required: [true, "A descrição do produto é obrigatória"],
        },
        src: {
            type: String,
            required: [true, "O caminho da imagem do produto é obrigatório"],
        },
        categoria: {
            type: String,
            required: [true, "A categoria do produto é obrigatória"],
            enum: {
                values: ["cabelo", "estetica", "higiene", "manicure", "maquiagem"],
                message: "A categoria {VALUE} não é um valor permitido, tente um desses valores:cabelo, estetica, higiene, manicure, maquiagem"
            }
        }
    },
    { timestamps: true }
);
const collectionName = process.env.COLLECTION_NAME;
const Produto = mongoose.model("Produto", produtoSchema, collectionName);

module.exports = Produto;