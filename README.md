# BackEndMat-Cosmeticos

![Node.js](https://img.shields.io/badge/Node.js-16.x-brightgreen)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-4.x-yellowgreen)
![Jest](https://img.shields.io/badge/Jest-27.x-orange)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)

## 📝 Sobre o projeto

O **BackEndMat-Cosmeticos** é uma API RESTful desenvolvida com **Node.js** e **Express**, focada na gestão de usuários e produtos de uma loja de cosméticos. O projeto visa demonstrar a criação de endpoints seguros, integração com banco de dados MongoDB e práticas de testes automatizados.

---

## 💻 Tecnologias utilizadas

- **Node.js** (v16.x)
- **Express** (v4.x)
- **MongoDB** (v4.x)
- **Jest** (v27.x) para testes
- **Mongoose** para modelagem de dados
- **dotenv** para gerenciamento de variáveis de ambiente

---

## 🚀 Como rodar localmente

1. Clone o repositório: 
git clone https://github.com/Matposs/BackEndMat-cosmeticos.git 
cd BackEndMat-cosmeticos

2. Instale as dependências:
npm install

3. Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
MONGO_URI: se estiver usando MongoDB local, pode ser mongodb://localhost:27017/matcosmeticos.
Se estiver usando MongoDB Atlas, substitua pela URI do cluster (algo como mongodb+srv://usuario:senha@cluster.mongodb.net/nome_do_banco?retryWrites=true&w=majority).
JWT_SECRET=seu_segredo_aqui
JWT_SECRET: qualquer string segura para gerar tokens JWT (ex: minhaChaveSecreta123).

5. Inicie o servidor:
npm start
