const mongoose = require('mongoose');
const Post = mongoose.model('Post');

//Início do controlador home
// exports.userInfoMiddleware = (req, res, next) => {

//     let userInfo = {name: "Guilherme", id: 8912349};

//     req.userInfo = userInfo;

//     next();
// };
 
exports.index = async (req, res) => {

    let responseJson = {
     pageTitle: "HOME", 
     posts:[]
     }
     
    const posts = await Post.find();

    responseJson.posts = posts;
    
    res.render("home", responseJson);
 
 };