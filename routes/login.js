const express = require('express');
//const uuid = require('uuid');
const router = express.Router();
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require("../data/Users");

router.get('/', (req,res) => {
    res.send('Login page');
})

router.post('/', async (req,res) => {
        
        var name =  req.body.username;
        var password = req.body.password;
    
        var userFound = users.find( (user) => user.username === name);

        if(userFound === undefined){
            console.log('user not found');
            res.status(401).send('Invalid credential');
        }
        else{
            var isMatch = await bcrypt.compare(password, userFound.password)
            if(isMatch){
                //We create a JWT
                const token = await JWT.sign(
                    { id: userFound.id,
                        username: userFound.username
                    },
                        "fijerionfrioo3324jeewq" /*secretKey*/, 
                    {expiresIn:  36000} //in seconds
                );

                res.json({token});
            }
            else{
                res.status(401).send('Invalid credentials');
            }
        }

        
})

module.exports = router;