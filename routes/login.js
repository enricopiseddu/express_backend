const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dataSource = require('../persistence/database');
const userEntitySchema = require('../persistence/entity/User');

router.get('/', (req,res) => {
    res.send('Login page');
})


//Login of a user
router.post('/', async (req,res) => {
        
        var formUsername =  req.body.username;
        var formPassword = req.body.password;
    
        const userRepository = dataSource.getRepository(userEntitySchema);

        const userFound = await userRepository.findOneBy({username: formUsername}); 

        if(userFound === undefined){
            console.log('user not found');
            res.status(401).send('Invalid credential');
        }
        else{
            var isMatch = await bcrypt.compare(formPassword, userFound.hashedPassword)
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