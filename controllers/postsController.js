//post schema to create a post
const Post = require('../models/post')

module.exports.create = async function(req, res){
    try{
        //the name attribute of textarea has "content", which can be used to directly access the data
        const newPost = await Post.create({
            content: req.body.content,
            user: req.user._id//this is coming bcz we set this in setAuthenticated fn in passport local
        });
        return res.redirect('back');
    }catch(err){
        if(err){console.log(`error in creating post ${err}`)}   
    }

}

// module.exports.posts = function(req,res){
//     res.end('This is posts');
// };