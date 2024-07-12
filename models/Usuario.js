const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const endereco = require('./Endereco.js');
const itemFavoritoSchema = require('./Favoritos.js');

const usuarioSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "O nome do usuário é obrigatório"]
        },
        email: {
            type: String,
            required: [true, "O email do usuário é obrigatório"],
            unique: true,
            match: [/.+\@.+\..+/, "Por favor, insira um email válido"]
        },
        senha: {
            type: String,
            required: [true, "A senha do usuário é obrigatória"]
        },
        endereco: endereco,
        favoritos: [itemFavoritoSchema]
    },
    { timestamps: true }
);
usuarioSchema.methods.comparePassword = async function (senha) {
    try {
        const isMatch = await bcrypt.compare(senha, this.senha);
        return isMatch;
    } catch (error) {
        throw new Error('Erro ao comparar as senhas');
    }
};

const collectionName = process.env.COLLECTION_NAME2;
const Usuario = mongoose.model("Usuario", usuarioSchema, collectionName);
module.exports = Usuario;