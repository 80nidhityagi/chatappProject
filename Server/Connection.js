const mongoose = require('mongoose')
 const connect = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/chatti');
        console.log("mongodb is connected");
    } catch (error) {
        console.log(error);
    }
 }
 
 module.exports = connect;