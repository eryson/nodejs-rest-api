const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const rotaUsuarios = require('./routes/usuarios');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')); // DEIXA O ARQUIVO PUBLICO
app.use(bodyParser.urlencoded({extended: false})); // ACEITAR APENAS DADOS SIMPLES
app.use(bodyParser.json()); // ACEITAR APENAS FORMATO JSON NO BODY

app.use((req, res, next) =>{
     res.header('Acces-Control-Allow-Origin', '*');
     res.header(
         'Acces-Control-Allow-Header',
         'Origin, X-Requested-With, Content-Type, Accpet, Authorization'
     );

     if (req.method === 'OPTIONS') {
         res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
         return res.status(200).send({});
     }

     next();
});

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);
app.use('/usuarios', rotaUsuarios);

// QUANDO NÃO ENCONTRA ROTAS
app.use((req, res, next) => {
    const erro = new Error('Não Encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;