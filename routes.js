const express = require('express');
const router = express.Router();
const {
    getPedidos,
    createPedido,
    getRotas,
    createRota,
    verificarMelhorRota
} = require('./controllers');

router.get('/pedidos', getPedidos);
router.post('/pedidos', createPedido);

router.get('/rotas', getRotas);
router.post('/rotas', createRota);

router.get('/melhor-rota/:id', verificarMelhorRota);

module.exports = router;

