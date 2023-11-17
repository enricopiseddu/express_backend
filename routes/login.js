const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRepository = require('../persistence/UserRepository');

const {loggerInfo, loggerError} = require('../utils/logger');

router.get('/', (req,res) => {
    res.send('Login page');
})


//Login of a user
router.post('/', async (req,res) => {
        
    try{
        var formUsername =  req.body.username;
        var formPassword = req.body.password;

        var userFound = await userRepository.findUserByUsername(formUsername); 

        if(userFound === null){
            loggerInfo.info('User try to login with a non-existing username');
            res.status(401).send('Invalid credential');
        }
        else{
            var isMatch = await bcrypt.compare(formPassword, userFound.hashedPassword)
            if(isMatch){
                //We create a JWT
                const token = JWT.sign(
                    {   
                        userId: userFound.id,
                        username: userFound.username
                    },
                        "fijerionfrioo3324jeewq" /*secretKey*/, 
                    {expiresIn:  36000} //in seconds
                );
                
                loggerInfo.info('User with username ' + userFound.username + ' login successfully');
                res.json({token});
            }
            else{
                loggerInfo.info('User with username ' + userFound.username + ' tried to login with a wrong password');
                res.status(401).send('Invalid credentials');
            }
        }
    }catch(e){
        loggerError.error('An error occurred: ', e)
        res.status(500).send('Internal server error');
        return
    }
})

module.exports = router;