const express = require('express');
//const uuid = require('uuid');
const router = express.Router();
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require("../data/Users");

const User = require('../models/users');

router.get('/', (req,res) => {
    res.send('Login page');
})

router.post('/', async (req,res) => {
        
        var name =  req.body.username;
        var password = req.body.password;
        /* User.find({}, function(err, user){
            if(err){
                res.send(err);
            }
            else{
                res.json(user);
            }
        }); */

        User.findOne({name, password}, function(err, user){
            var userFound = user;

            if(err){
                console.log('user not found');
                res.status(401).send('Invalid credential');
                //res.send(err);
                
            }
            else{
                var isMatch = bcrypt.compare(password, userFound.password)
                if(isMatch){
                    //We create a JWT
                    const token = JWT.sign(
                        {name}, //bad idea!
                            "fijerionfrioo3324jeewq", 
                        {expiresIn:  36000} //in seconds
                );
                console.log(token);
                res.json({token});
                }
                else{
                    res.status(401).send('Invalid credential');
                }
                    //res.send(user);
            }
            
        });
    
        /* var userFound = users.find( (user) => user.username === name);

        if(userFound === undefined){
            console.log('user not found');
            res.status(401).send('Invalid credential');
        }
        else{
            var isMatch = await bcrypt.compare(password, userFound.password)
            if(isMatch){
                //We create a JWT
                const token = await JWT.sign(
                    {name}, //bad idea!
                        "fijerionfrioo3324jeewq", 
                    {expiresIn:  36000} //in seconds
                );

                res.json({token});
            }
            else{
                res.status(401).send('Invalid credential');
            }
            
        } */

        
})

module.exports = router;