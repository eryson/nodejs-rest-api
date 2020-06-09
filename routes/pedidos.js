const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})};
        conn.query(
            'SELECT * FROM pedidos',
            (error, resultado, field) => {
                conn.release();

                if (error) {return res.status(500).send({error: error, response: null})};

                return res.status(200).send({
                    response: resultado
                })
            }
        )
    });
});

// INSERE UM PEDIDO
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})};
        conn.query(
            'INSERT INTO pedidos (produtos_id_produtos, quantidade) VALUES (?,?)',
            [req.body.id_produto, req.body.quantidade],
            (error, resultado, field) => {
                conn.release();

                if (error) {return res.status(500).send({error: error, response: null})};

                res.status(201).send({
                    mensagem: 'Pedido Inserido com Sucesso'
                })
            }
        )
    });
});

// RETORNA OS DADOS DE UM PEDIDO
router.get('/:id_pedido', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})};
        conn.query(
            'SELECT * FROM pedidos WHERE id_pedidos = ?;',
            [req.params.id_pedido],
            (error, resultado, field) => {
                conn.release();

                if (error) {return res.status(500).send({error: error, response: null})};

                return res.status(200).send({
                    response: resultado
                })
            }
        )
    });       
});

// EXCLUI UM PEDIDO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})};
        conn.query(
            'DELETE FROM pedidos WHERE id_pedidos = ?',
            [req.body.id_pedido],

            (error, resultado, field) => {
                conn.release();

                if (error) {return res.status(500).send({error: error, response: null})};

                res.status(202).send({
                    mensagem: 'Pedido Excluido com Sucesso'
                })
            }
        )
    });
});

module.exports = router;