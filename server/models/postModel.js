const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            default: '',
        },
        author: {
            type: String,
            default: 'Anonymous',
        },
        likes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true } // createdAt & updatedAt
);

module.exports = mongoose.model('Post', postSchema);
