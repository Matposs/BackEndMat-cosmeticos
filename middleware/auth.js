const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }

    try {
        const tokenString = token.replace('Bearer ', '');
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        const usuario = await Usuario.findById(decoded.id);

        if (!usuario) {
            return res.status(401).json({ message: 'Acesso negado. Usuário não encontrado.' });
        }

        req.user = usuario;
        next();
    } catch (error) {
        console.error('Erro na verificação do token:', error.message);
        return res.status(401).json({ message: 'Token inválido. Acesso não autorizado.' });
    }
};