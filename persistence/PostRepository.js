const dataSource = require('./dataSource');
const postEntitySchema = require('./../persistence/entity/Post');
const postsRepository = dataSource.getRepository(postEntitySchema);
const {Like} = require('typeorm');

const getAllPosts = async () => {
    return await postsRepository.find();
}

const getAllPostsWithUsername = async () => {
    /* query equivalente a "SELECT Posts.title, Posts.notes, Posts.date, user FROM Posts JOIN users ON Posts.userId=users.id;" */ 

    return await postsRepository.find({
        /* select: ["title", "notes", "date"], */ 
        relations: ["user"],
    });
}


// Create a new post
const createNewPost = async (_id, _title, _notes, _user) => {
    const newPost = await postsRepository.create({id: _id, title: _title, notes: _notes, userId: _user});
    await postsRepository.save(newPost);
}

const getPostsOfUser = async (_userId) =>{
    return await postsRepository.find({where: {userId : _userId}});
}

const getPostById = async(_id) =>{
    return await postsRepository.findBy({id: _id});
}

const deletePost = async(_id) =>{
    await postsRepository.delete({id: _id});
}

const getAllPostsWithUsernamePaginated = async(limit, offset) => {
    return await postsRepository.find({
        relations: ["user"],
        take: limit,
        skip: offset
    });
}

const getPostsContaining = async(_string) =>{
    return await postsRepository.find({
        relations: ["user"],
        where: { 
            notes: Like('%' + _string +'%')
        }
    })
}

const updatePost = async(_id, _title, _notes) =>{

    await postsRepository.update({id : _id}, { title: _title, notes: _notes});
}



module.exports = {getAllPosts, getAllPostsWithUsername, createNewPost, getPostsOfUser, getPostById, deletePost, getAllPostsWithUsernamePaginated,

    getPostsContaining, updatePost}