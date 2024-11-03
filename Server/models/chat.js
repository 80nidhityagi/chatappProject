const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    isgroupChat:{type:Boolean},
    chat:[
       { type:mongoose.Schema.Types.ObjectId,
        ref:User
       }
    ]
},{timestamps:true})

module.exports = mongoose.model('Chat',ChatSchema)