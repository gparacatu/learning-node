const express = require("express");

//Rotas
const router = express.Router();
router.get("/", (req, res) => {

   let obj = {
    nome: req.query.nome,
    idade: req.query.idade,
    mostrar: true,
    ingredientes: [
        {nome: "Contra-filé", quantidade: "1kg"},
        {nome: "Ajino Sal", quantidade: "20g"},
        {nome: "Molho Shoyo", quantidade: "50ml"}
    ]
    }   
   res.render("home", obj);

});

module.exports = router; 