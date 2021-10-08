exports.signup = (req , res) => {

   const {name , email , password} = req.body
   res.status(200).json({
       status: 200 , 
       data: " i am authentication",
       name: name,
       email: email,
       password: password,
   })
}