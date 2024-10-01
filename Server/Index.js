const express = require('express')
const app = express()
const user = require('./routes/user')
const cors = require('cors')
const connection = require('./Connection');
const path = require('path')
app.use(express.urlencoded({extended:false}));
app.use(express.json());
connection();
app.use(cors())
app.use(user);

app.listen(3000,(error)=>{
    if(error)console.log("error",error);
    else console.log("server is started on port 3000");
})

