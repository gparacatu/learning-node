const mongoose = require('mongoose');

require("dotenv").config({path:"variables.env"});

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = global.Promise;
mongoose.connection.on("error", (error) =>{
    console.error(`Erro: ${error.message}`);
});

//Carregando todos os Models
require('./models/Post');

//Carregando a aplicação
const app = require('./app');

app.set("port", process.env.PORT || 7777);

const server = app.listen(app.get("port"), () => {
    console.log(`Servidor: ${server.address().address} Porta: ${server.address().port}`);
});