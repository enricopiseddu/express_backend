const JWT = require('jsonwebtoken');

module.exports = async( req, res, next) =>{

    const token = req.header('x-auth-token');

    //check user set the token
    if(!token){
        return res.status(400).json({
            "errors": [
                   {
                       "msg": "Please insert a JWT",
                   }
               ]

       });
    }

    //verify token
    try{
        let user = await JWT.verify(token, "fijerionfrioo3324jeewq");
        req.user = user.username;
        req.userId = user.userId
        next();
    }catch (error){
        return res.status(400).json({
            "errors": [
                   {
                       "msg": "Invalid token",
                   }
               ]
       });
    }
}