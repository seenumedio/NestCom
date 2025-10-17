const PostModel = require('../models/postModel')

const createPost = async (req, res) => {

}
const getAllPosts = async (req, res) => {
    const posts = await PostModel.find({}).sort({ createdAt: -1 })
    res.status(200).json(posts);
}
const getPost = async (req, res) => {
    const id = req.params?.postId;
    const post = await PostModel.findOne({ _id: id })
    if (!post) {
        return res.status(404).json({ error: 'No such post found' });
    }
    res.status(200).json(post);
}
const deletePost = async (req, res) => {

}
const updatePost = async (req, res) => {

}

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    deletePost,
    updatePost
}