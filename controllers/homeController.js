const Post = require('../models/post')
const User = require('../models/user');

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
        //getting all the users, to display
        const allUsers  = await User.find({});
        return res.render('home', {
            title:"SocialMedia-WebApp ",
            posts: allPosts ,
            all_users: allUsers
        });
    }catch(err){
        console.log(`${err}`);
    }
   
  

}

