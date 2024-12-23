

// const mongoose = require('mongoose')

// const Schema = mongoose.Schema;
// const MessageSchema = new Schema(
//     {
//         senderId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User', // References the User model
//             required: true,
//         },
//         receiverId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User', // References the User model
//             required: true,
//         },
//         content: {
//             type: String,
//             required: true,
//         },
//         timestamp: {
//             type: Date,
//             default: Date.now, // Auto-sets the current timestamp
//         },
//         roomId: {
//             type: String,
//             // required: true, // To associate the message with the correct chat room
//         },
//         isRead: {
//             type: Boolean,
//             default: false, // Indicates if the message has been read by the receiver
//         },
//     },
//     { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
// );
// module.exports = mongoose.model('Message',MessageSchema)



const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
    },
    senderName:{
      type:String,

    },
    content: {
      type: String,
      required: true,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat", // References the Chat model
      required: true,
    },
    // isReadBy: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User", // Tracks users who have read the message
    //   },
    // ],
  },-
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

module.exports = mongoose.model("Message", MessageSchema);
