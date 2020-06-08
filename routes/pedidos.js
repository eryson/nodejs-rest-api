const express = require('express');
const router = express.Router();

// RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'GET: Retorna os Pedidos'
    });
});

// INSERE UM PEDIDO
router.post('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'POST: Pedido Foi Criado'
    });
});

// RETORNA OS DADOS DE UM PEDIDO
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido;
    res.status(200).send({
        mensagem: 'GET: Detalhes do Pedido',
        id_pedido: id
    });        
});

// EXCLUI UM PEDIDO
router.delete('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'DELETE: Pedido Excluido'
    });
});

module.exports = router;