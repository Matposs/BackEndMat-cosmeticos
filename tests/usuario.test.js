const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('../server.js');
const Usuario = require('../models/Usuario.js');
const bcrypt = require('bcrypt');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
});

afterAll(async () => {
    await mongoServer.stop();
});

afterEach(async () => {
    await Usuario.deleteMany({ nome: { $regex: /^Teste/ } });
});

describe('CRUD Usuario API', () => {
    it('Deve criar um novo usuário pelo "admin"', async () => {
        const endereco = {
            rua: "Rua Teste",
            numero: "20",
            cidade: "Cidade Teste",
            estado: "Estado Teste",
            cep: "12345-678"
        };

        const usuarioData = {
            nome: 'Teste',
            email: 'teste@email.com',
            senha: 'senha123',
            endereco: endereco
        };

        usuarioData.senha = await bcrypt.hash(usuarioData.senha, 10);

        const res = await request(app)
            .post('/usuarios')
            .send(usuarioData);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.nome).toBe('Teste');
        expect(res.body.email).toBe('teste@email.com');
    });

    it('Deve criar um novo usuário, partindo do próprio usuário', async () => {
        const endereco = {
            rua: "Rua Teste",
            numero: "20",
            cidade: "Cidade Teste",
            estado: "Estado Teste",
            cep: "12345-678"
        };

        const usuarioData = {
            nome: 'Teste',
            email: 'teste@email.com',
            senha: 'senha123',
            senhaConfirmar: 'senha123',
            endereco: endereco
        };
        const res = await request(app)
            .post('/usuarios/registro')
            .send(usuarioData);
        expect(res.statusCode).toEqual(201);
        expect(res.text).toBe('{"msg":"Usuário registrado com sucesso!"}')
    });

    it('Deve retornar todos os usuários', async () => {
        await Usuario.create([
            {
                nome: 'Teste',
                email: 'usuario1@email.com',
                senha: await bcrypt.hash('senha123', 10),
                endereco: {  // Objeto de endereço diretamente
                    rua: "Rua Teste 1",
                    numero: "10",
                    cidade: "Cidade Teste 1",
                    estado: "Estado Teste 1",
                    cep: "54321-987"
                }
            },
            {
                nome: 'Teste',
                email: 'usuario2@email.com',
                senha: await bcrypt.hash('senha123', 10),
                endereco: {  // Objeto de endereço diretamente
                    rua: "Rua Teste 2",
                    numero: "15",
                    cidade: "Cidade Teste 2",
                    estado: "Estado Teste 2",
                    cep: "67890-123"
                }
            },
        ]);

        const res = await request(app)
            .get('/usuarios');

        expect(res.statusCode).toEqual(200);
    });

    it('Deve retornar um usuário por ID', async () => {
        const usuario = await Usuario.create({
            nome: 'Teste',
            email: 'teste@email.com',
            senha: await bcrypt.hash('senha123', 10),
            endereco: {
                rua: "Rua Teste",
                numero: "20",
                cidade: "Cidade Teste",
                estado: "Estado Teste",
                cep: "12345-678"
            }
        });

        const res = await request(app)
            .get(`/usuarios/${usuario._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toBe(usuario._id.toString());
        expect(res.body.nome).toBe('Teste');
    });

    it('Deve atualizar um usuário existente', async () => {
        const usuario = await Usuario.create({
            nome: 'Teste',
            email: 'antigo@email.com',
            senha: await bcrypt.hash('senha123', 10),
            endereco: {
                rua: "Rua Antiga",
                numero: "30",
                cidade: "Cidade Antiga",
                estado: "Estado Antigo",
                cep: "98765-432"
            }
        });

        const novoDadosUsuario = {
            email: 'atualizado@email.com',
        };

        const res = await request(app)
            .put(`/usuarios/${usuario._id}`)
            .send(novoDadosUsuario);

        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toBe(usuario._id.toString());
        expect(res.body.email).toBe('atualizado@email.com');
    });

    it('Deve deletar um usuário existente', async () => {
        const usuario = await Usuario.create({
            nome: 'Teste',
            email: 'deletar@email.com',
            senha: await bcrypt.hash('senha123', 10),
            endereco: {
                rua: "Rua Para Deletar",
                numero: "40",
                cidade: "Cidade Deletar",
                estado: "Estado Deletar",
                cep: "13579-246"
            }
        });

        const res = await request(app)
            .delete(`/usuarios/${usuario._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Usuário deletado com sucesso');

        const usuarioDeletado = await Usuario.findById(usuario._id);
        expect(usuarioDeletado).toBeNull();
    });
    it('Deve logar um usuário existente com sucesso', async () => {
        const hashedPassword = await bcrypt.hash('senha123', 12);
        await Usuario.create({
            nome: 'Teste',
            email: 'teste@email.com',
            senha: hashedPassword,
            endereco: {
                rua: "Rua Para Deletar",
                numero: "40",
                cidade: "Cidade Deletar",
                estado: "Estado Deletar",
                cep: "13579-246"
            }
        });
        const res = await request(app)
            .post('/usuarios/login')
            .send({
                email: 'teste@email.com',
                senha: 'senha123'
            });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});