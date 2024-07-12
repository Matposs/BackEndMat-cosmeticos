const Usuario = require("../models/Usuario.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

async function createUsuario(req, res) {
    try {
        const novoUsuario = new Usuario(req.body);
        await novoUsuario.save();
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
async function registrarUsuario(req, res) {
    const { nome, email, senha, senhaConfirmar } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json('Usuário já registrado.');
        }
        if (!nome || !email || !senha) {
            return res.status(422).json({ msg: "Nome, email e senha são obrigatórios." });
        }
        if (senha != senhaConfirmar) {
            return res
                .status(422)
                .json({ msg: "A senha e a confirmação precisam ser iguais!" });
        }
        const salt = await bcrypt.genSalt(12);
        const hashedSenha = await bcrypt.hash(senha, salt)
        usuario = new Usuario({ nome, email, senha: hashedSenha });
        await usuario.save();
        res.status(201).json({ msg: "Usuário registrado com sucesso!" });
    } catch (error) {
        res.status(500).json('Erro no servidor.');
    }
}

async function getUsuarios(req, res) {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getUsuarioById(req, res) {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function updateUsuario(req, res) {
    try {
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!usuarioAtualizado) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
function generateAuthToken(usuario) {
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

async function deleteUsuario(req, res) {
    try {
        const usuarioDeletado = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuarioDeletado) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function login(req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(422).json({ msg: "Email e senha são obrigatórios." });
    }
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'Credenciais inválidas.' });
        }
        const isMatch = await usuario.comparePassword(senha);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciais inválidas.' });
        }
        const token = generateAuthToken(usuario);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ msg: 'Erro no servidor.' });
    }
}


module.exports = {
    createUsuario,
    getUsuarios,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
    registrarUsuario,
    login,
    generateAuthToken
};
