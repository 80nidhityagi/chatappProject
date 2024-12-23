// const express = require('express');
// const router = express.Router();

// const messagecontroller = require('../controller/messagecontroller');


// router.get('/getmessages/:sender_id/:receiver_id',(req,res)=>{
//     // console.log("get messege h ye");
    
//     messagecontroller.getmessages(req,res);
// })
// router.post('/inputmessege',(req,res)=>{
//     console.log("input messe");
    
//     messagecontroller.inputmessage(req,res);
// })

// module.exports = router


const express = require('express');
const router = express.Router();

const messagecontroller = require('../controller/messagecontroller');


router.get('/getmessages/:sender_id/:chat_id',(req,res)=>{
    console.log("get messege h ye");
    
    messagecontroller.getmessages(req,res);
})
router.post('/inputmessege',(req,res)=>{
    console.log("input messe");
    
    messagecontroller.inputmessage(req,res);
})

module.exports = router