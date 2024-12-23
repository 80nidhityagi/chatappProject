// const express = require('express');
// const router = express.Router();
// const chatcontroller = require('../controller/chatcontroller')

// router.get('/getChatUser/:userid',(req,res)=>{
//     chatcontroller.getChatValeUser(req,res);
// })

// router.post('/saveChatValeUser',(req,res)=>{    

// chatcontroller.saveChatUser(req,res);

// })

// router.post('groupChat',(req,res)=>{
//     chatcontroller.saveGroupChatUser(req,res);
// })



// module.exports = router;








const express = require('express');
const router = express.Router();
const chatcontroller = require('../controller/chatcontroller')

router.get('/getChatUser/:userid',(req,res)=>{
    chatcontroller.getChatValeUser(req,res);
})

router.post('/saveSimpleChat',(req,res)=>{    

chatcontroller.saveSimpleChat(req,res);

})

// router.post('/groupChat',(req,res)=>{
//     chatcontroller.saveGroupChatUser(req,res);
// })



router.post('/saveGroupChat',(req,res)=>{
    console.log("group chat ke andr aaye hai");
    
    chatcontroller.saveGroupChatUser(req,res);
})



module.exports = router;
