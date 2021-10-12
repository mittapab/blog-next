const User = require('./../models/user.model');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')

exports.signup = (req ,res) => {

    User.findOne({email: req.body.email}).exec((err , user) => {

        // check email bofore signup

         if(user){   return res.status(400).json({ err: 'email is taken !! '});  }


         const {email , password , name} = req.body;
         let username = shortId.generate();
         let profile = `${process.env.CLIENT_ENV}/profile/${username}`;
         let newUser = new User({name , email , password , profile , username})

         newUser.save( (err , success)=> {

          if(err){ return res.status(400).json({err: err}) }
          
          res.status(200).json({ success , success})

         })
    })

}

exports.signin = (req , res) => {

    const {email , password} = req.body

    User.findOne({email}).exec((err , user) => {
        if(err || !user){
            return res.staus(400).json({ err : " email is takan "})
        }

        if(!user.authenticate(password)){
            return res.staus(400).json({ err : " password is not match "})
        }

        const token = jwt.sign({_id: user._id} , "e3r54e6rr45g4f5sdg4t54yg45drg4g4dgh44u" , {expiresIn: '1d'});
        res.cookie('token' , token , {expiresIn: '1d'})
        const {_id , username , name ,email , role} = user
        return res.status(200).json({
            token ,  
            user: {_id , username , name ,email , role}
        })
    })

}

exports.signout = (req ,res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout success'
    })
  }
  
  exports.requireSignin = expressJwt({
      secret: "e3r54e6rr45g4f5sdg4t54yg45drg4g4dgh44u",
      algorithms: ["HS256"], 
      userProperty: "auth",
    });