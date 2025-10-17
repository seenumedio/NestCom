const express = require('express')

const router = express.Router()
const {
    createPost,
    getAllPosts,
    getPost,
    deletePost,
    updatePost } = require('../controllers/postController')

router.get('/', getAllPosts);
router.get('/:postId', getPost);
router.post('/create', createPost);
router.delete('/delete/:postId', deletePost);
router.patch('/update/:postId', updatePost);

module.exports = router