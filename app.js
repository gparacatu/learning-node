const express = require('express');
const router = require('./routes/index');
const mustache = require('mustache-express');

//Configurações do aplicativo

const app = express();

app.use("/", router);

//Configuração do express para POST
app.use(express.json());

//Configuração do Mustache
app.engine("mst", mustache());
app.set("view engine", "mst");
app.set("views", __dirname + "/views");

module.exports = app;

