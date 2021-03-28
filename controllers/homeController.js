//Início do controlador home
// exports.userInfoMiddleware = (req, res, next) => {

//     let userInfo = {name: "Guilherme", id: 8912349};

//     req.userInfo = userInfo;

//     next();
// };
 
exports.index = (req, res) => {

    let obj = {
     //pageTitle: "Título de teste"
     userInfo: req.userInfo 
     }   
    res.render("home", obj);
 
 };