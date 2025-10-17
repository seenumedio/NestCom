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
    comment:{
        type:String,
        require: true
    },
    replies:[{
        username: {
            type: String,
            required: true
        },
        commentId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        reply:{
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: new Date().getTime()
        }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema);