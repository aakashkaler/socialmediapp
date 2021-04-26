
const User = require('../models/users');


module.exports.profile=function(req,res)
{
    if(req.cookies.user_id)
    {
       User.findById(req.cookies.user_id,function(err,user)
       { 
           if(err)
           {
               console.log('error ');
               return ;
           }

        if(user)
        {
            return res.render('user_profile',{
                title:"User profile",
                user:user
            });
        }
        return res.redirect('/users/sign-in');
       });
    }
    else
    {
        return res.redirect('/users/sign-in');
    }
    
}

//render sing up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
         title:"codeial | SignUp"
    });
}

//render sign in page
module.exports.signIn=function(req,res)
{
    return res.render('user_sign_in',{
        title:"codeial | SignIn"
    });
}

//get the sign up data
module.exports.create =function(req,res)
{
   if(req.body.password!=req.body.confirm_password)
   {
       return res.redirect('back');
   }
    User.findOne({email: req.body.email},function(err,user){
        if(err)
        {
            console.log('error in finding user in signing up');
            return ;
        }
        if(!user)
        {
            User.create(req.body,function(err,user)
            {
                if(err)
                 {
                    console.log('error in creating user in signing up');
                    return ;
                 }
                  
                 return res.redirect('/users/sign-in');

            });
        }
        else
        {
            return res.redirect('back');
        }
    })
}

//get the sign up data
module.exports.createSession =function(req,res)
{
    //find the users
    User.findOne({email: req.body.email},function(err,user)
    {
       if(err)
       {
           console.log('user not found in sign in');
           return ;
       }

       //handel user if found
       if(user)
       {
           // if found handel password matching 
           if(user.password!=req.body.password)
           {
               return redirect('back');
           }

           //handel sesaon creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
       }
       else
       {
           //handel user if not found
            return res.redirect('back');
       }
    });
    

    
}