require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConnect.js');
const routes = require('./routes/index.js');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.use(routes);

const startServer = async () => {
    await connectDB();

    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
};

startServer();