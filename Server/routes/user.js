// const express = require('express');
// const router = express.Router();
// const usercontroller = require('../controller/usercontroller')


// router.get('getUserName/:id',(req,res)=>{
//     console.log("aaye hai");
    
//     usercontroller.getUserName(req,res);
// })

// router.post('/signup',(req,res)=>{
//     console.log("singiu");
    
//     usercontroller.signup(req,res)
// })
// router.post('/login',(req,res)=>{
    
// usercontroller.login(req,res)    ;
// })



// const jwt = require('jsonwebtoken');
// const SECRET_KEY = 'nidhi tyagi';

// // Middleware to verify the token
// const verifyToken = (req, res, next) => {
//     console.log("inside verify token");
    
//     const token = req.headers['authorization'];

//     if (!token) {
//         console.log("not token");
        
//         return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
//     }

//     jwt.verify(token, SECRET_KEY, (err, decoded) => {
//         if (err) {
//             console.log("inside verify");
            
//             // Check if the error is due to token expiration
//             if (err.name === 'TokenExpiredError') {
//                 // Redirect or handle expired token case
//                 return res.status(401).json({ message: 'Session expired, please log in again' });
//             }
//             }
//         // Token is valid, add user info from decoded token to the request object
//         req.user = decoded;
//         next();
//     });
// };

// // Example protected route
// router.get('/profile', verifyToken, (req, res) => {
//     console.log("inside profile");
    
//     res.json({ message: 'Welcome to your profile', user: req.user });
// });


// router.get('/allUsers',(req,res)=>{
//     console.log("all useers");
    
//     usercontroller.allUsers(req,res);
// })



// module.exports = router;



const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Temporary storage for uploaded files


router.get('/getUserName/:id',(req,res)=>{
    console.log("aaye hai");
    
    usercontroller.getUserName(req,res);
})

router.post('/signup', upload.single("image"),(req,res)=>{
    console.log(req.body);
    
    console.log("singiu");
    
    usercontroller.signup(req,res)
})
router.post('/login',(req,res)=>{
    
usercontroller.login(req,res)    ;
})



router.post('/editUser/:id',upload.single("profile"),(req,res)=>{
    console.log("inside edituser is called",req.params.id);
    
    console.log(req.body);
    console.log(req.file);
    usercontroller.editUser(req,res);
    
    
})



const jwt = require('jsonwebtoken');
const SECRET_KEY = 'nidhi tyagi';

// Middleware to verify the token
const verifyToken = (req, res, next) => {
    console.log("inside verify token");
    
    const token = req.headers['authorization'];

    if (!token) {
        console.log("not token");
        
        return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log("inside verify");
            
            // Check if the error is due to token expiration
            if (err.name === 'TokenExpiredError') {
                // Redirect or handle expired token case
                return res.status(401).json({ message: 'Session expired, please log in again' });
            }
            }
        // Token is valid, add user info from decoded token to the request object
        req.user = decoded;
        next();
    });
};

// Example protected route
router.get('/profile', verifyToken, (req, res) => {
    
    res.json({ message: 'Welcome to your profile', user: req.user });
});


router.get('/allUsers',(req,res)=>{
    
    
    usercontroller.allUsers(req,res);
})



module.exports = router;
