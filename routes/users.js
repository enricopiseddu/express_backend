const express = require('express');
//const checkJWT = require('../middleware/checkJWT');
const router = express.Router();
const dataSource = require('./../persistence/database')
const userEntitySchema = require('./../persistence/entity/User')
const userRepository = dataSource.getRepository(userEntitySchema)


//Get all users
router.get('/', /*checkJWT ,*/ async (req,res) => {
    
    const usersFromDb = await userRepository.find();
    
    res.send(usersFromDb);
});

//Delete a user by specifying his usedId
router.delete('/:userId', async(req, res) => {
    const idToDelete = req.params.userId;

    const userToDelete = await userRepository.findOneBy({id: idToDelete});

    if(userToDelete){
        await userRepository.remove(userToDelete);
        res.send('user deleted correctly');
    }else{
        res.status(404).send('user to delete not found');
    }
   
});

//Update username of a user
router.put('/updateUser', async (req,res) =>{
    const userIdToUpdate = req.body.id;
    const newUsername = req.body.newUsername;

    const userToUpdate = await userRepository.findOneBy({id: userIdToUpdate});

    if(userToUpdate){
        //we update the username: equivalent to UPDATE users SET username='newUsername' WHERE id='userIdToUpdate'
        await userRepository.update({id: userIdToUpdate}, {username: newUsername});
        res.send('Utente aggiornato correttamente');
    }else{
        res.status(404).send('Impossibile aggiornare, utente non trovato');
    }
});


module.exports = router;