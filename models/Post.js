const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');

const postSchema = new mongoose.Schema({
    photo:String,
    title:{
        type: String,
        trim: true,
        required: "O título é obrigatório!"
    },
    slug: String,
    body: {
        type: String,
        trim: true
    },
    tags: [String]
});

postSchema.pre("save", async function(next) {

    if (this.isModified("title"))
    {
        this.slug = slug( this.title, {lower:true} )

        //Cria um regex para buscar qualquer tipo parecido de slug no banco
        const slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`, 'i');
        
        //faz uma busca no banco utilizando o regex e o construtor do model
        const postsWithSlug = await this.constructor.find({slug:slugRegex});

        //verifica se retornou algum registro
        if(postsWithSlug.length > 0){
            this.slug = `${this.slug}-${postsWithSlug.length + 1}`;
        }
    }
    
    next();
}); 

module.exports = mongoose.model("Post", postSchema, "posts");