const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');

const postSchema = new mongoose.Schema({
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

postSchema.pre("save", function(next) {

    if (this.isModified("title"))
    {
        this.slug = slug( this.title, {lower:true} )
    }
    
    next();
}); 

module.exports = mongoose.model("Post", postSchema, "posts");