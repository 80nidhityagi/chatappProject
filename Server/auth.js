const jwt = require('jsonwebtoken')
const potected = (req,res,next)=>{
    console.log("we are in the protacted ");
    // next()
    tokenr = req.headers.authorization;
        let usertoken = tokenr.slice(7,tokenr.length);
        if(!usertoken) res.send('there is no token')
        jwt.verify(usertoken,'23hkidjiddid34' , (err, decoded) => {
            if (err) {
                console.log("bad token");
                
              return res.status(401).json({ message: 'Invalid token!' });
            }
            console.log(decoded);
            
            req.user = decoded; // Decoded payload (contains user information)
            next();

})
}
    module.exports = potected;