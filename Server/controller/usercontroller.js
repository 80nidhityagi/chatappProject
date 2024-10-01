const User = require('../models/User')
const signup = async function(req,res){
   const name = req.body.name;
   const email = req.body.email;
   const password  = req.body.password;
    const entry = await User.find({email:email})
    if(entry.length>0){
      res.send({succes:false,message:"user is present already",data:''})
    }
   else{
    console.log('create user');
    
    await User.create({
        name:name,
        email:email,
        password:password
    })
    res.json("user create succesfully")
   }
  console.log('after');
   
}
module.exports={
    signup
}