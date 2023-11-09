const express = require('express');
//const checkJWT = require('../middleware/checkJWT');
const router = express.Router();
const repository = require('../persistence/Repository')


//Get all users
router.get('/', /*checkJWT ,*/ async (req,res) => {
    try{
        const usersFromDb = await repository.findAllUsers(); 
        
        res.send(usersFromDb);
    }catch(error){
        res.status(500).send('Internal server error')
    }
});


//Delete a user by specifying his usedId
router.delete('/:userId', async(req, res) => {
    
    try{
        const idToDelete = req.params.userId;

        userToDelete = await repository.findUserById(idToDelete);

        if(userToDelete){
            await repository.removeUser(userToDelete);
            res.send('user deleted correctly');
        }else{
            res.status(404).send('user to delete not found');
        }
    }catch(error){
        res.status(500).send('Internal server error');
    }
});


//Update username of a user
router.put('/updateUser', async (req,res) =>{
    try{
        const userIdToUpdate = req.body.id;
        const newUsername = req.body.newUsername;

        const userToUpdate = await repository.findUserById(userIdToUpdate);
        console.log(userToUpdate);
        if(userToUpdate){
            console.log('dentro if')
            await repository.updateUsername(userIdToUpdate, newUsername);
            res.send('Utente aggiornato correttamente');
        }else{
            res.status(404).send('Impossibile aggiornare, utente non trovato');
        }
    }catch(error){
        res.status(500).send('Internal server error')
    }
});


module.exports = router;