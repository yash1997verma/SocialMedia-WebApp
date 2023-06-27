//importing user model
const User = require('../models/user')
module.exports.profile = function(req,res){
    res.render('user_profile', {
        title:"user Profile"
    });
}

//redner the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_signUp', {
        title: "Sign Up"
    });
}

//render the sign in page
module.exports.signIn = function(req, res){
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

// module.exports.create = function(req, res){
//    if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//    } 
//    User.findOne({email: req.body.email}, function(error, user){
//         if(error) {console.log('error in fintding user in signing up ');return;}
//         if(!user){
//             User.create(req.body, function(err, user){
//                 User.create(req.body, function(err, user){
//                     if(err){console.log('error in creating user while signing up'); return;}
//                     //after user has sign up we will redirect to signIN page
//                     return res.redirect('users/user_signIn');


//                 })
//             })
//         }else{ return res.redirect('back')}
//    });
// }


//signIn and create a session for the user
module.exports.createSession = function(req,res){
    //later
}