const User = require('../models/User')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async function(req,res){
   const name = req.body.name;
   const email = req.body.email;
   const password  = req.body.password;
    const entry = await User.find({email:email})
    if(entry.length>0){
      res.send({succes:false,message:"user is present already",data:''})
    }
   else{
    let saltroud = 10;
    let newpassword = await bycrypt.hash(password,saltroud)
    console.log(newpassword);
    
   let user = await User.create({
        name:name,
        email:email,
        password:newpassword
    })       
    let token = jwt.sign({email},"nidhityagi",{ expiresIn:'5m'})
    res.send({succes:true,message:"user created succesfully",data:user,token:token})
   }
   
}
const login = async (req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
   const  user = await User.findOne({email:email})
     if(!user){
      res.send({succes:false,message:"email or password is not correct"})
     }
     else{
     bycrypt.compare(password,user.password,(err,result)=>{
      if(result){
        const token = jwt.sign({ id: user._id.toString(), username: user.username }, "nidhi tyagi", {
          expiresIn: '5m' // Token expires in 5 min
        
          
          });            
          res.send({succes:true,message:"Login succesfully",data:user,token:token})
      }
      else {        
        res.send({succes:false,message:"email or password is not correct"})
      } 
     })
    
    
  
      
     }
     
     
}

module.exports={
    signup,login
}