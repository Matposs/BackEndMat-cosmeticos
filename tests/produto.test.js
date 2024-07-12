const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('../server.js');
const Produto = require('../models/Produto.js');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
});

afterAll(async () => {
    await mongoServer.stop();
});

afterEach(async () => {
    await Produto.deleteMany({ nome: { $regex: /^Produto Teste/ } });
});

describe('CRUD Produto API', () => {
    it('Deve criar um novo produto', async () => {
        const res = await request(app)
            .post('/produtos')
            .send({
                nome: "Produto Teste",
                preco: 85.90,
                quantidade: 100,
                categoria: "cabelo",
                descricao: "Creme para cabelos lisos",
                src: "/src/cabeloFem01.png"
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.nome).toBe('Produto Teste');
        expect(res.body.preco).toBe(85.90);
        expect(res.body.quantidade).toBe(100);
        expect(res.body.categoria).toBe('cabelo');
        expect(res.body.src).toBe('/src/cabeloFem01.png');
        expect(res.body.descricao).toBe('Creme para cabelos lisos');
    });

    it('Deve retornar todos os produtos', async () => {
        const produto = new Produto({ nome: 'Produto Teste', categoria: 'cabelo', preco: 10, quantidade: 1, src: "/src/cabeloFem01.png", descricao: "Creme para cabelos lisos" });
        await produto.save();

        const res = await request(app).get('/produtos');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(61);
        expect(res.body[60].nome).toBe('Produto Teste');
    });

    it('Deve retornar um produto pelo ID', async () => {
        const produto = new Produto({ nome: 'Produto Teste', categoria: 'cabelo', preco: 10, quantidade: 1, src: "/src/cabeloFem01.png", descricao: "Creme para cabelos lisos" });
        await produto.save();

        const res = await request(app).get(`/produtos/${produto._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.nome).toBe('Produto Teste');
    });

    it('Deve atualizar um produto', async () => {
        const produto = new Produto({ nome: 'Produto Teste', categoria: 'cabelo', preco: 10, quantidade: 1, src: "/src/cabeloFem01.png", descricao: "Creme para cabelos lisos" });
        await produto.save();

        const res = await request(app)
            .put(`/produtos/${produto._id}`)
            .send({ categoria: 'manicure' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.categoria).toBe('manicure');
    });

    it('Deve deletar um produto', async () => {
        const produto = new Produto({ nome: 'Produto Teste', categoria: 'cabelo', preco: 10, quantidade: 1, src: "/src/cabeloFem01.png", descricao: "Creme para cabelos lisos" });
        await produto.save();

        const res = await request(app).delete(`/produtos/${produto._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Produto deletado com sucesso');
    });
});