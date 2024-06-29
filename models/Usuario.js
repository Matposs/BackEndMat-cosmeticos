const mongoose  = require("mongoose");

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
        endereco: {
            type: enderecoSchema,
            required: [true, "O endereço é obrigatório"]
        },
        carrinho: {
            type: [itemCarrinhoSchema],
            default: []
        }
    },
    { timestamps: true }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;