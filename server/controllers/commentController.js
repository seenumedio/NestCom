const CommentModel = require('../models/commentModel')
const mongoose = require('mongoose')

const getAllComments = async (req, res) => {
    const postId = req.params?.postId;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(404).json({ error: 'Invalid post id' })
    }
    const comments = await CommentModel.find({ postId }).sort({ createdAt: -1 })
    res.status(200).json(comments);
}
const createComment = async (req, res) => {
    const postId = req.params?.postId;
    const { username, comment } = req?.body;

    try {
        if (postId) {
            const Comment = await CommentModel.create({
                postId,
                comment,
                username: username ? username : 'admin'
            })
            res.status(201).json(Comment);
        } else {
            res.status(404).json({ mssg: 'Comment with this post ID not found' })
        }
    } catch (err) {
        res.status(400).json({ mssg: err })
    }
}
const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const Comment = await CommentModel.findOneAndDelete({ _id: commentId })

    if (!Comment) {
        res.status(404).json({ error: 'No such comment' })
    }
    res.status(200).json(Comment);
}
const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { username, comment, likes } = req?.body;
    if(!commentId){
        return res.status(404).json({error: 'No comment id received'})
    }

    const Comment = await CommentModel.findOneAndUpdate(
        { _id: commentId },
        {
            comment,
            likes: likes || 0
        }
    )

    if (!Comment) {
        res.status(404).json({ error: 'No such comment' })
    }
    res.status(200).json(Comment);
}
module.exports = {
    createComment,
    getAllComments,
    deleteComment,
    updateComment
}