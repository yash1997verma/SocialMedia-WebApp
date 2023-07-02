const mongoose = require('mongoose');

const postSchema = new moongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.ObjecId,
        refer:'User'
    }
},{
    //automatically gets two fields in our DB, created at, updated at
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;