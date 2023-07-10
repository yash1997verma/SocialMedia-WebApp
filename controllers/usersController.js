//importing user model
const User = require('../models/user')
module.exports.profile = async function(req,res){
    try{
        const users = await User.findById(req.params.id);
        
        res.render('user_profile', {
            title:"user Profile",
            profile_user: users
        });
    }catch(err){
        console.log(`error in profile ${err}`)
    }
    
}

//for updating user info, through form on profile page
module.exports.update = async (req, res )=>{
    try{
        // console.log(req.body);
        if(req.user.id == req.params.id){
            await User.findByIdAndUpdate(req.params.id, req.body);//this will update the info of current form  
            res.redirect('back');
        }else{
           res.status(401).send("Unauthorized"); 
        }
    }catch(err){
        console.log(`error in updating user info ${err}`);
    }
}

//redner the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    
    return res.render('user_signUp', {
        title: "Sign Up"
    });
}

//render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_signIn', {
        title: "Sign In"
    });
}

//get the signUp data
module.exports.create = async function(req, res){
   try{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    const existingUser = await User.findOne({email: req.body.email});
    if(!existingUser){
        try{
            const newUser = await User.create(req.body);
            //after user is created we redirect to signIn page
            return res.redirect('/users/signIn')
        }catch(error){
            console.log(`error in creating user ${error} `)
        } 
    }else{
        console.log(`User already exist`);
        return res.redirect('back')
    }

   }catch(error){
        console.log(`error occured while signUp ${error}`);
   }
}



//signIn and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/')
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
      if (err) {
        // Handle any error that occurred during logout
        console.error(err);
      }
      return res.redirect('/');
    });
};