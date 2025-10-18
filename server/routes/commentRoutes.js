const express = require('express')

const router = express.Router()
const {
    createComment,
    getAllComments,
    deleteComment,
    updateComment, 
    likeComment} = require('../controllers/commentController')

router.get('/:postId/comments', getAllComments)
router.post('/:postId/createComment', createComment)
router.delete('/:postId/comments/:commentId', deleteComment)
router.patch('/:postId/comments/:commentId', updateComment)
router.patch('/:postId/comments/:commentId/likes', likeComment)

module.exports = router