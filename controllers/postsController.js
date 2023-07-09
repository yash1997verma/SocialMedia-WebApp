//post schema to create a post
const Post = require('../models/post')
const Comment = require('../models/comment');
module.exports.create = async function(req, res){
    try{
        console.log(req.body);
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

//for deleting a post, we will delete post and comments as well
module.exports.destroy = async function(req,res){
    try{
        const post = await Post.findById(req.params.id);
        //.id means converting the _id into string
        if(post.user == req.user.id){//checking if the one who is trying to delete is the user who created the post
            // Delete the post
            await Post.deleteOne({ _id: post._id });
            //delete the comments associated with the post
            await Comment.deleteMany({post: req.params.id});
            
           
            return(res.redirect('back'));
        }
    }catch(err){
        console.log(`Error in deleteing the post ${err}`);
    }   
}

