const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')

router.post('/signup',(req,res)=>{
    console.log("singiu");
    
    usercontroller.signup(req,res)
})
module.exports = router;
