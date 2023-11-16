const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userRepository = require('../persistence/UserRepository');


router.put('/updatePassword', async (req,res) =>{
    
    const actualPassword = req.body.actualPassword;
    const newPassword = req.body.newPassword;

    var userFound = await userRepository.findUserByUsername(req.user);
    
    if(userFound === null){
        console.log('user not found');
        res.status(401).send('User not found');
    }else{
        var isMatch = await bcrypt.compare(actualPassword, userFound.hashedPassword);

        if(isMatch){
            const newHashedPassword = await bcrypt.hash(newPassword, 10)
            await userRepository.updatePassword(userFound.id, newHashedPassword)
            res.send('Password changed correctly');
        }else{
            res.status(409).send('Password does not match')
        }
    }
})


module.exports = router;