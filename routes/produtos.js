const express = require('express');
const router = express.Router();

// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'GET: Retorna os Produtos'
    });
});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };

    res.status(200).send({
        mensagem: 'POST: Produto Foi Criado',
        produtoCriado: produto
    });
});

// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;
    res.status(200).send({
        mensagem: 'GET: Detalhes do Produto',
        id_produto: id
    });
});

// ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'PATCH: Produto Alterado'
    });
});

// EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'DELETE: Produto Excluido'
    });
});

module.exports = router;