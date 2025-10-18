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
    const { username, comment, parentId } = req?.body;

    try {
        if (postId) {
            const Comment = await CommentModel.create({
                postId,
                comment,
                parentId: parentId || null,
                username: username ? username : 'admin',
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

    try {
        const comment = await CommentModel.findById(commentId);
        if (!comment) return res.status(404).json({ error: 'No such comment' });

        // Recursive function to delete all nested replies
        async function deleteReplies(parentId) {
            const replies = await CommentModel.find({ parentId });
            for (const reply of replies) {
                await deleteReplies(reply._id);
                await CommentModel.deleteOne({ _id: reply._id });
            }
        }

        await deleteReplies(comment._id);
        await CommentModel.deleteOne({ _id: comment._id });

        res.status(200).json({ message: 'Comment and all replies deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete comment', details: err.message });
    }
};

const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { comment } = req?.body;
    if (!commentId) {
        return res.status(404).json({ error: 'No comment id received' })
    }

    const Comment = await CommentModel.findOneAndUpdate(
        { _id: commentId },
        {
            comment,
        }
    )

    if (!Comment) {
        res.status(404).json({ error: 'No such comment' })
    }
    res.status(200).json(Comment);
}
const likeComment = async (req, res) => {
    const { commentId } = req?.params;
    const { likes, likedBy } = req?.body;
    if (!commentId) return res.status(404).json({ error: 'No comment id received' })

    const Comment = await CommentModel.findOneAndUpdate(
        { _id: commentId },
        { likes, likedBy },
        { new: true }
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
    updateComment,
    likeComment
}