const Usuario = require('../models/Usuario.js');
const jwt = require('jsonwebtoken');

async function getFavoritos(req, res) {
    try {
        const usuario = await Usuario.findById(req.user._id).populate('favoritos.produtoId');
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).json(usuario.favoritos);
    } catch (error) {
        console.error('Erro ao obter favoritos:', error);
        res.status(500).send('Erro ao obter favoritos.');
    }
}

async function addFavorito(req, res) {
    const { _id } = req.body;
    try {
        const usuario = await Usuario.findById(req.user._id);
        usuario.favoritos = usuario.favoritos || [];
        usuario.favoritos.push({ produtoId: _id, _id: _id });
        await usuario.save();
        res.status(200).json(usuario.favoritos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao adicionar favorito.');
    }
}

async function removeFavorito(req, res) {
    const { produtoId } = req.params;
    try {
        const usuario = await Usuario.findById(req.user._id);
        const indexToRemove = usuario.favoritos.findIndex(favorito => favorito.produtoId ? favorito.produtoId._id.toString() : favorito._id.toString() === produtoId);
        if (indexToRemove === -1) {
            return res.status(404).json({ message: 'Favorito não encontrado' });
        }
        usuario.favoritos.splice(indexToRemove, 1);
        await usuario.save();
        res.status(200).json(usuario.favoritos);
    } catch (error) {
        console.error('Erro ao remover favorito:', error);
        res.status(500).send('Erro ao remover favorito.');
    }
}
async function isFavoritado(req, res) {
    const { produtoId } = req.params;
    try {
        const usuario = await Usuario.findById(req.user._id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        const isFavorito = usuario.favoritos.some(favorito => {
            if (favorito.produtoId) {
                return favorito.produtoId._id.toString() === produtoId;
            }
            else favorito._id.toString() === produtoId;
        });

        res.status(200).json({ isFavorito });
    } catch (error) {
        console.error('Erro ao verificar se é favorito:', error);
        res.status(500).send('Erro ao verificar se é favorito.');
    }
}
const verifyToken = async (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
        return { valid: false, message: 'Acesso negado. Nenhum token fornecido.' };
    }

    try {
        const tokenString = token.replace('Bearer ', '');
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        const usuario = await Usuario.findById(decoded.id);

        if (!usuario) {
            return { valid: false, message: 'Acesso negado. Usuário não encontrado.' };
        }
        req.user = usuario;
        return { valid: true, usuario };
    } catch (error) {
        console.error('Erro na verificação do token:', error.message);
        return { valid: false, message: 'Token inválido. Acesso não autorizado.' };
    }
};

module.exports = {
    getFavoritos,
    addFavorito,
    removeFavorito,
    isFavoritado,
    verifyToken
};