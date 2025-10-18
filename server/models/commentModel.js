const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        require: true
    },
    likes: {
        type: Number,
        default: 0,
    },
    likedBy: [{ type: String, ref: 'User' }],
    parentId: { type: Schema.Types.ObjectId, default: null },
}, {
    timestamps: true
})

commentSchema.pre('findOneAndDelete', async function (next) {
    const comment = await this.model.findOne(this.getQuery());

    if (!comment) return next();

    // Recursive function to delete all nested replies
    async function deleteReplies(parentId) {
        const replies = await comment.model.find({ parentId });
        for (const reply of replies) {
            await deleteReplies(reply._id);
            await comment.model.deleteOne({ _id: reply._id });
        }
    }

    await deleteReplies(comment._id);
    next();
});


module.exports = mongoose.model('Comment', commentSchema);