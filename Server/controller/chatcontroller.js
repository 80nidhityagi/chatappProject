// const User = require('../models/User')
// const  Chat = require('../models/Chat')

// async function getChatValeUser(req, res) {
//     const userid = req.params.userid;
//     console.log("inside get chat vale ussesr");

//          let chats = await Chat.find({ user:userid}).populate('user','name');

//        let  chatusers = [];
         
//          chats.forEach(element => {
            
            
//              console.log(element.user[0]);
//             //  console.log(element.user[1].name);
//              chatusers.push(element.user[0]);
//              chatusers.push(element.user[1]);
            
//          });
         
         
         
//     res.send({succes:true,data:chatusers})

// }
// async function saveChatUser(req, res) {
//     let sender_id = req.body.sender;
//     let receiver_id = req.body.receiver;
//      let data = await Chat.findOne({
//         isgroupChat:false,
//         user:{$all: [sender_id,receiver_id]}
//     });
//     console.log(data,'data hai ye');
    
//     if(!data){
//     let obj = {
//         isgroupChat: false,
//         user: [sender_id, receiver_id],

//     }
//     await Chat.create(obj);
// }
//     res.send({ succes: true, message: 'userchat' })
// }


// async function saveGroupChatUser(req,res){
//     let groupName = req.body.groupName;
//     let users = req.body.users;

//     let data = {
//         isgroupChat:true,
//         users,
        
//         groupName:groupName

//     }
//     await Chat.create(data);





// }

// module.exports = {

//     getChatValeUser,saveChatUser,saveGroupChatUser
// }




const User = require('../models/User')
const  Chat = require('../models/Chat')

async function getChatValeUser(req, res) {
    const userid = req.params.userid;

    try {
        // Fetch all chats where the user is part of the `user` array
        const chats = await Chat.find({ user: userid })
            .populate('user', 'name') // Populate user names
             // Populate group name for group chats (if applicable)
//chatusers array bnane se phele
        let chatusers = [];
        // console.log('chats',chats);
        

        // Process each chat
        chats.forEach(chat => {
            if (chat.isGroupChat) {
                // For group chats, add the group name
                console.log(chat.groupName,'group name');
                
                chatusers.push({ type: 'group', name: chat.groupName,chat_id:chat._id });
            } else {
                // For one-to-one chats, find the other user's name
                const otherUser = chat.user.find(u => u._id.toString() !== userid);
                if (otherUser) {
                    chatusers.push({ type: 'user', name: otherUser.name ,chat_id:chat._id});
                }
            }
        });

        // console.log('chatuser array',chatusers);
        

        res.send({ success: true, data: chatusers });
    } catch (error) {
        console.error("Error fetching chat data:", error);
        res.status(500).send({ success: false, message: "Error fetching chat data" });
    }
}

async function saveSimpleChat(req, res) {
    console.log('inside save simple chat');
    
    let sender_id = req.body.sender;
    let receiver_id = req.body.receiver;

    // Ensure consistent order of users
    let sortedUsers = [sender_id, receiver_id].sort();
    // console.log('Sorted Users:', sortedUsers);


    // Find the chat object with the sorted user array
    let data = await Chat.findOne({
        // isgroupChat: false,
        user: { $all: sortedUsers }
    });
    // console.log('data',data);
    

    // If no chat exists, create a new one
    if (!data) {
        console.log("inside data");
        
        let obj = {
            isgroupChat: false,
            user: sortedUsers,
        };
        await Chat.create(obj);
        let data = await Chat.findOne({
            // isgroupChat: false,
            user: { $all: sortedUsers }
        });
        res.send({ success: true, message: 'userchat',data:data._id });
    }
    else{
        res.send({success:true,data:data._id})
    }

}



async function saveGroupChatUser(req,res){
    let groupName = req.body.groupName;
    let users = req.body.users;
    let adminId = req.body.adminId;

    let data = {
        groupName:groupName,
        isGroupChat:true,
        user:users,
        
        adminId:adminId

    }
    console.log(data);
    
   let d =  await Chat.create(data);        
   console.log('d',d._id);
   
    console.log("data added sussfully.....");
    res.status(200).json({ success: true, data: d });
}

async function getGroupChatUser(req,res){
   

}

module.exports = {

    getChatValeUser,saveSimpleChat,saveGroupChatUser,getGroupChatUser
}