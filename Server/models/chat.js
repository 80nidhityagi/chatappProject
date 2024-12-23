

// const mongoose = require('mongoose');
// const User = require('./User');
// const Schema = mongoose.Schema;

// const ChatSchema = new Schema({
//     isgroupChat:{type:Boolean,default:false},
//     user:[
//        { type:mongoose.Schema.Types.ObjectId,
//         ref:User
//        }
//     ],
//     groupName:{type:String,trim:true}
// },{timestamps:true})

// //

// module.exports = mongoose.model('Chat',ChatSchema)   




const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,default:false
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Only set if `isGroupChat` is true
    },
    // latestMessage: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Message",
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
