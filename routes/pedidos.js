const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})};
        conn.query(
            `SELECT
                pedidos.id_pedidos,
                pedidos.quantidade,
                produtos.id_produtos,
                produtos.nome,
                produtos.preco
             FROM
                pedidos
                INNER JOIN produtos ON produtos.id_produtos = pedidos.produtos_id_produtos`,
            (error, result, field) => {
                conn.release();

                if (error) {return res.status(500).send({error: error, response: null})};

                const response = {
                    pedidos: result.map(pedido => {
                        return {
                            id_pedido: pedido.id_pedidos,
                            quantidade: pedido.quantidade,
                            produto: {
                                id_produto: pedido.id_produtos,
                                nome: pedido.nome,
                                preco: pedido.preco
                            },
                            
                            request: {
                                tipo: 'GET',
                                decricao: 'Retorna um pedido específico',
                                url: 'http://localhost:3000/pedidos/' + pedido.id_pedidos
                            }
                        };
                    })
                };

                return res.status(200).send(response);
            }
        )
    });
});

// INSERE UM PEDIDO
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})};
        conn.query('SELECT * FROM produtos WHERE id_produtos = ?', 
        [req.body.id_produto], 
        (error, result, field) => {            
            if (error) {return res.status(500).send({error: error})};
            if (result.length == 0) {
                return res.status(404).send({
                    mensagem: "Produto não encontrado com este ID"
                })
            };

            conn.query(
                'INSERT INTO pedidos (produtos_id_produtos, quantidade) VALUES (?,?)',
                [req.body.id_produto, req.body.quantidade],
                (error, result, field) => {
                    conn.release();
    
                    if (error) {return res.status(500).send({error: error, response: null})};
    
                    const response = {
                        mensagem: 'Pedido Inserido com Sucesso',
                        pedidoCriado: {
                            id_pedido: result.id_pedidos,
                            id_produto: req.body.id_produtos,
                            quantidade: req.body.quantidade,
                            request: {
                                tipo: 'GET',
                                decricao: 'Retorna todos os pedidos',
                                url: 'http://localhost:3000/pedidos'
                            }
                        }
                    }
    
                    return res.status(201).send(response);
                }
            )
        });
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

                const response = {
                    produto: {
                        id_pedido: result[0].id_pedidos,
                        id_produto: result[0].id_produtos,
                        quantidade: result[0].quantidade,
                        request: {
                            tipo: 'GET',
                            decricao: 'Retorna todos os pedidos',
                            url: 'http://localhost:3000/pedidos'
                        }
                    }
                }

                return res.status(200).send(response);
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

                const response = {
                    mensagem: 'Pedido Excluido com Sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um Pedido',
                        url: 'http://localhost:3000/pedidos',
                        body: {
                            id_produto: 'INT',
                            quantidade: 'INT'
                        }
                    }
                }
                
                return res.status(202).send(response);
            }
        )
    });
});

module.exports = router;