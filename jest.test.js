const request = require('supertest');
const app = require('./index');

describe('API de Rota de Entregas', () => {

    it('GET /pedidos - deve retornar a lista de pedidos', async () => {
        const res = await request(app).get('/api/pedidos');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).not.toBeNull();
        expect(res.body.length).not.toBeNaN();
    });

    it('POST /pedidos - deve criar um novo pedido', async () => {
        const pedido = {
            endereco: { latitude: 10, longitude: 20 },
            produto: 'Produto 1',
            quantidade: 2
        };
        const res = await request(app).post('/api/pedidos').send(pedido);
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Pedido criado com sucesso');
        expect(res.body.id).not.toBeNull();
        expect(res.body.id).not.toBeNaN();
    });

    it('GET /rotas - deve retornar a lista de rotas', async () => {
        const res = await request(app).get('/api/rotas');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).not.toBeNull();
        expect(res.body.length).not.toBeNaN();
    });

    it('POST /rotas - deve criar uma nova rota', async () => {
        const rota = { latitude: 30, longitude: 40 };
        const res = await request(app).post('/api/rotas').send(rota);
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Rota criada com sucesso');
        expect(res.body.rota).toHaveProperty('id');
        expect(res.body.rota.id).not.toBeNull();
        expect(res.body.rota.id).not.toBeNaN();
    });

    it('GET /melhor-rota/:id - deve retornar a melhor rota de entrega', async () => {
        // Criando pedidos e rotas para testar a melhor rota
        await request(app).post('/api/pedidos').send({ endereco: { latitude: 10, longitude: 20 }, produto: 'Produto 1', quantidade: 2 });
        await request(app).post('/api/rotas').send({ latitude: 30, longitude: 40 });

        const res = await request(app).get('/api/melhor-rota/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeNull();
        expect(res.body).not.toBeNaN();
    });
});

