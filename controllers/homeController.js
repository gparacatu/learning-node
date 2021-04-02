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
     posts:[],
     tags:[],
     tag:''   
     }
    
    responseJson.tag = req.query.t;
    
    //filtro para clicar nas tags e exibir os posts referentes
    const postFilter = (typeof responseJson.tag != "undefined") ? {tags:responseJson.tag}:{};

    const tagsPromise = Post.getTagsList(); 
    const postsPromise = Post.findPosts(postFilter);
    
    const [tags, posts] = await Promise.all([ tagsPromise, postsPromise ]);

    for(let i in tags){
        if(tags[i]._id == responseJson.tag){
            tags[i].class = "selected";
        }
    }

    responseJson.tags = tags;

    responseJson.posts = posts;
    
    res.render("home", responseJson); 
   
 };