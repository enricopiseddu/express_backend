const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const repository = require('../persistence/Repository');


router.get('/', (req,res) => {
    res.send('Login page');
})


//Login of a user
router.post('/', async (req,res) => {
        
    try{
        var formUsername =  req.body.username;
        var formPassword = req.body.password;

        var userFound = await repository.findUserByUsername(formUsername); 

        if(userFound === null){
            console.log('user not found');
            res.status(401).send('Invalid credential');
        }
        else{
            var isMatch = await bcrypt.compare(formPassword, userFound.hashedPassword)
            if(isMatch){
                //We create a JWT
                const token = JWT.sign(
                    {   
                        id: userFound.id,
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
    }catch(e){
        console.log('error is: ', e)
        res.status(500).send('Internal server error');
        return
    }


    
})

module.exports = router;