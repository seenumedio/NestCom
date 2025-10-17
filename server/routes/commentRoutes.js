const express = require('express')

const router = express.Router()
const {
    createComment,
    getAllComments,
    deleteComment,
    updateComment } = require('../controllers/commentController')

router.get('/:postId/comments', getAllComments)
router.post('/:postId/createComment', createComment)
router.delete('/:postId/comments/:commentId', deleteComment)
router.patch('/:postId/comments/:commentId', updateComment)

module.exports = router