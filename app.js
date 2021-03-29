const express = require('express');
const router = require('./routes/index');
const mustache = require('mustache-express');
const helpers = require('./helpers'); 
const errorHandler = require('./handlers/errorHandler');

//Configurações do aplicativo

const app = express();

//Configuração do helper, variáveis globais
app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.teste = "123";
    next();
});

//Configuração do express para POST
app.use(express.json());

//Configuração do enconding
app.use(express.urlencoded({ extended: true }));

//Rotas
app.use("/", router);

//Se chegar aqui é porque não encontrou uma rota e busca a página de error
app.use(errorHandler.notFount); 

//Configuração do Mustache
app.engine("mst", mustache(__dirname +"/views/partials", ".mst"));
app.set("view engine", "mst");
app.set("views", __dirname + "/views");

module.exports = app;

