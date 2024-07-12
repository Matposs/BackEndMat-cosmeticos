require('dotenv').config();
const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.r1lpgce.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`,
        );
        console.log("Conectou ao banco de dados");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        throw error;
    }
};

module.exports = connectDB;