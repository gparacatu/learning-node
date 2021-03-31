const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const slug = require('slug');

exports.view = async (req, res) => {
    const post = await Post.findOne({slug:req.params.slug});

    res.render("postView", {post}); 
};

exports.add = (req, res) => {
    res.render('postAdd');
};

exports.addAction = async (req, res) => {

    //Adicionar as tags
    req.body.tags = req.body.tags.split(",").map(tag=>tag.trim());

    const post = new Post(req.body);
    
    try {
        await post.save();
    } catch(error){
        req.flash("error", "Erro: "+error.message);
        return res.redirect("/post/add");
    }
    

    req.flash("success", "Post salvo com sucesso!");

    res.redirect("/");
};

exports.edit = async (req, res) => {

    //Carrega as informações do formulário
    const post = await Post.findOne({ slug:req.params.slug });

    //chama o formulário de edição
    res.render("postEdit", { post });

};

exports.editAction = async (req, res) => {
    
    //gerando o slug novamente
    req.body.slug = slug(req.body.title, { lower:true });

    //Adicionar as tags
    req.body.tags = req.body.tags.split(",").map(tag=>tag.trim());
     
    //Procura o item enviado
    try{
        const post = await Post.findOneAndUpdate(
            {slug:req.params.slug},
            req.body,
            {
                new:true, //Uma vez feita a alteração ele retorna um novo post atualizado, se não colocar ele retorna o item antigo.
                runValidators:true //se não colocar, ele não faz as validações dos models
            }
        );
    }catch(error){
        req.flash("error", "Erro: "+error.message);
        return res.redirect("/post/"+req.params.slug+"/edit");
    }
    
    //envia uma mensagem
    req.flash("success", "Post atualizado com sucesso!");

    res.redirect("/");
};