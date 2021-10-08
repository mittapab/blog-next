const mongoose = require('mongoose')
const crypto = require("crypto")

const userSchema = mongoose.Schema({
    username:{
        type:String ,
        trim: true ,
        max: 32,
        unique: true,
        index: true,
        lowercase: true,
        required: true

   },
   name:{
       type:String ,
       trim: true ,
       maxLength: 32,
       required: true
   },
   email:{
       type:String ,
       trim: true ,
       unique: true,
       lowerCase: true,
       required: true

  },
  profile:{
   type:String ,
   required: true

},
hashed_password:{
   type:String ,
   required: true

},
salt: String , 
about:{
   type:String
},
role:{
   type: Number,
   trim:true
},
photo:{
   data: Buffer,
   contentType: String
},
resetPasswordLink:{
   data:String,
   default: ''
}
 } , {timestamp:true}
 
 )

 userSchema.virtual('password').set(function(password){

    this._password = password;
    this.sult = this.makeSalt();
    this.hashed_password =  this.encryptPassword(password)

 }).get(function(){

    return this._password
 })

 userSchema.methods = {

    authenticate: function(paintext){

        return this.encryptPassword(paintext) === this.hashed_password;

    },
    encryptPassword: function(password){
        if(!password) return '';
        
        try {

            return crypto.createHmac('sha1' , this.salt).update(password).digest('hex')
            
        } catch (error) {
            
        }
    } ,
    makeSalt:function(){
        return Math.round(new Date().valueOf() * Math.random()) + ''
    }
 }