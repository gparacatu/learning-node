const express = require('express');
const router = require('./routes/index');
const mustache = require('mustache-express');
const helpers = require('./helpers'); 
const errorHandler = require('./handlers/errorHandler');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Configurações do aplicativo
const app = express();

//Configuração do express para POST
app.use(express.json());

//Configurações da pasta public
app.use(express.static(__dirname+"/public"));

//Configuração do enconding
app.use(express.urlencoded({ extended: true }));

//Configuração cookie
app.use(cookieParser(process.env.SECRET));

//Configuração da sessão
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));

//Configuração do flash
app.use(flash());

//Configuração Passport
app.use(passport.initialize());
app.use(passport.session());
const User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Configuração do helper, variáveis globais
app.use((req, res, next) => {
    res.locals.h = { ...helpers };
    res.locals.user = req.user; 
    res.locals.flashes = req.flash();

    //Filtra os menus
    if(req.isAuthenticated()){
        //filtrar menu para guest ou logged
        res.locals.h.menu = res.locals.h.menu.filter(menu=>menu.logged);
    }else{
        //filtrar apenas o guest
        res.locals.h.menu = res.locals.h.menu.filter(menu=>menu.guest);
    }

    next();
}); 

//Rotas
app.use("/", router);

//Se chegar aqui é porque não encontrou uma rota e busca a página de error
app.use(errorHandler.notFount); 

//Configuração do Mustache
app.engine("mst", mustache(__dirname +"/views/partials", ".mst"));
app.set("view engine", "mst");
app.set("views", __dirname + "/views");

module.exports = app;

