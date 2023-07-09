const mongoose = require('mongoose');
 

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user:{//referencing any other schema will help us establish relationship
        type: mongoose.Schema.ObjectId,
        ref:'User'//same name as we exported in user models
    },
    //include an array of all comment  in this post schema itself
    comments:[
        {
            
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
   
   
    
},{
    //automatically gets two fields in our DB, created at, updated at
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;