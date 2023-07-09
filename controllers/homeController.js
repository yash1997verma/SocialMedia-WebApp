const Post = require('../models/post')


module.exports.home = async function(req, res){
    try{
         //{}finds all documents
        const allPosts = await Post.
        find({}).
        populate('user').
        populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
            
        }).
        exec();
        
        return res.render('home', {
            title:"SocialMedia-WebApp ",
            posts: allPosts  
        });
    }catch(err){
        console.log(`${err}`);
    }
   
  

}

