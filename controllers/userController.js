const User = require('../models/User');

exports.login = (req, res) => {

    res.render('login');

};

exports.loginAction = (req, res) => {

    const auth = User.authenticate();

    auth(req.body.email, req.body.password, (error, result) => {
            if(!result){
                req.flash("error", "Erro na autenticação.");
                res.redirect("/users/login");
                return;
            }

            //para logar de verdade
            req.login(result, ()=>{});

            req.flash("success", "Login efetuado com sucesso.");
            res.redirect("/");
    });
    
};

exports.register = (req, res) => {
    res.render('register');
}; 

exports.registerAction = (req, res) => {
    const newUser = new User(req.body);
    User.register(newUser, req.body.password, (error) => {
        if(error){
            req.flash("error", "Erro ao cadastrar: "+error.message);
            res.redirect("/users/register");
            return;
        }
        req.flash("success", "Cadastro efetuado com sucesso. Faça o login.");
        res.redirect("/users/login");
    });
};

exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "Logout efetuado com sucesso.");
    res.redirect("/");
};