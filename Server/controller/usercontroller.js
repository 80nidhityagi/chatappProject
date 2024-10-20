const User = require('../models/User')
const bcrypt = require('bcrypt');
const signup = async function(req,res){
   const name = req.body.name;
   const email = req.body.email;
   const password  = req.body.password;
    const entry = await User.find({email:email})
    if(entry.length>0){
      res.send({succes:false,message:"user is present already",data:''})
    }
   else{
    let salt = 10
    let newpassword =  await bcrypt.hash(password,salt);
    console.log(newpassword,'newpassword');
    
    await User.create({
        name:name,
        email:email,
        password:newpassword
    })
    res.json("user create succesfully")
   }
   
}

async function login(req,res){
  let email = req.body.email;
  let  password = req.body.password;
  let user =await User.find({email:email});
  if(user.email===email&&user.password===password){
res.send("welcome")    
    console.log("you are welcome");
    
  }
  else{
    res.send("not present")
    console.log("user not present");
    
  }

}
module.exports={
    signup,login
}