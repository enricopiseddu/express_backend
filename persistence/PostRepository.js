const dataSource = require('./dataSource');
const postEntitySchema = require('./../persistence/entity/Post');
const postsRepository = dataSource.getRepository(postEntitySchema);

const getAllPosts = async () => {
    return await postsRepository.find();
}

const getAllPostsWithUsername = async () => {
    /* query equivalente a "SELECT Posts.title, Posts.notes, Posts.date, user FROM Posts JOIN users ON Posts.userId=users.id;" */ 

    return await postsRepository.find({
        select: ["title", "notes", "date"], 
        relations: ["user"],
    });
}


module.exports = {getAllPosts, getAllPostsWithUsername}