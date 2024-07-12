require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConnect.js');
const routes = require('./routes/index.js');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: 'https://mat-cosmeticos.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

// Middleware para capturar e logar erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
        process.exit(1); // Sai do processo com erro
    }
};

startServer();

// Exporta a aplicação express
module.exports = app;
