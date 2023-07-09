const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = async function(req, res){
    try{
        console.log(req.body);

        const relatedPost= await Post.findById(req.body.post);
        if(relatedPost){//if post is found with id
            const newComment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            //  // Save the new comment to the database
            
            relatedPost.comments.push(newComment);
            await relatedPost.save();//after we add id to array, we will save the post
            res.redirect('/');

        }
        
    }catch(err){
    console.log(`error in comments controller ${err}`);
    }
}

//action for deleting a comment
module.exports.destroy = async (req,res)=>{
    try{
        //remember that we need to find the post to which comment is associated 
        //and delete the comment id inside the comment array which is saved in post
        const commentToBeDeleted = await Comment.findById(req.params.id);
        

        if(commentToBeDeleted.user == req.user.id){//to check if the user who is trying to delete is the one who commented
            //save the postId so that we can use to delete from post
            let postId = commentToBeDeleted.post;

            //delete the comment from DB
            const del = await Comment.deleteOne({ _id: commentToBeDeleted._id });
            // console.log(del);
            
            //we need to Update the post and delete from the comment array in post
            await Post.findByIdAndUpdate( postId, {$pull: {comments: req.params.id}});
            
            return res.redirect('back');
        }
    }catch(err){
        console.log(`error in deleting comment ${err}`);
    }
}

