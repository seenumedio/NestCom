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
    if (comment) {
        await this.model.deleteMany({ parentId: comment._id });
    }
    next();
});

module.exports = mongoose.model('Comment', commentSchema);