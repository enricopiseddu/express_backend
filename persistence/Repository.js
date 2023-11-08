const dataSource = require('./dataSource');
const userEntitySchema = require('./../persistence/entity/User')
const usersRepository = dataSource.getRepository(userEntitySchema)


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

const removeUser = async (userToRemove) => {
    await usersRepository.remove(userToRemove);
}


module.exports = {findAllUsers, findUserById, findUserByUsername, createNewUser, removeUser}