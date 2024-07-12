require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConnect.js');
const routes = require('./routes/index.js');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ['https://mat-cosmeticos.vercel.app', 'http://localhost:3000', 'http://127.0.0.1:5500/'];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use(routes);

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
        process.exit(1);
    }
};

startServer();

module.exports = app;
