const dataSource = require('./dataSource');
const userEntitySchema = require('./../persistence/entity/User');
const usersRepository = dataSource.getRepository(userEntitySchema);


const findAllUsers = async () => {
    return await usersRepository.find();
}

const findUserById = async (_id) => {
    return await usersRepository.findOneBy({id: _id});
}

const findUserByUsername = async (_username) => {
    return await usersRepository.findOneBy({username: _username});
}

const createNewUser = async (_id, _username, _hashedPassword) => {
    const newUser = await usersRepository.create({id: _id, username: _username, hashedPassword: _hashedPassword});
    await usersRepository.save(newUser);
}

const removeUser = async (_userToRemove) => {
    await usersRepository.remove(_userToRemove);
}

//update the username: equivalent to UPDATE users SET username='_newUsername' WHERE id='_userIdToUpdate'
const updateUsername = async (_userIdToUpdate, _newUsername) => {
    await usersRepository.update({id: _userIdToUpdate}, {username: _newUsername})
}

const updatePassword = async (_userId, _newHashedPassword) => {
    await usersRepository.update({id: _userId}, {hashedPassword: _newHashedPassword})
}



module.exports = {findAllUsers, findUserById, findUserByUsername, createNewUser, removeUser, updateUsername, updatePassword}