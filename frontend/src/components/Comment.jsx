import { FaHeart, FaRegHeart, FaEdit, FaTrash, FaPencilAlt, FaReply, FaTimes } from 'react-icons/fa'
import IconBtn from './IconBtn'
import { useDeleteCommentMutation, useUpdateCommentMutation } from '../features/comments/commentApi'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import CommentForm from './CommentForm'

function Comment({ comment }) {

  const commentId = comment._id
  const { postId } = useParams()

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);

    const options = {
      year: 'numeric',
      month: 'short', // e.g., Jan, Feb
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    return date.toLocaleString('en-US', options);
  };
  const createdAt = formatDate(comment.createdAt);

  // delete comment
  const [deleteComment] = useDeleteCommentMutation() || {}
  function handleDelete() {
    deleteComment({
      postId,
      commentId
    })
  }
  // edit comment
  const [editComment] = useUpdateCommentMutation() || {}
  const [isEditing, setIsEditing] = useState(false);
  function handleEditBtn() {
    setIsEditing(prev => !prev)
  }
  function handleEdit(mssg) {
    editComment({
      postId,
      commentId,
      data: {
        comment: mssg,
      }
    })
    handleEditBtn()
  }

  return (
    <>
      <div className='comment my-2 border-1 border-indigo-400/50 rounded-md p-2'>
        <div className='header flex justify-between text-sm text-indigo-500'>
          <span className='username font-bold'>{comment.username}</span>
          <span className='time' style={{ color: 'grey' }}>{createdAt}</span>
        </div>

        {isEditing
          ? <div className='pl-4 py-2'>
            <CommentForm
              autoFocus={true}
              mssg={comment.comment}
              handleEdit={handleEdit}
            />
          </div>
          : <div className='mssg p-2 text-black'>{comment.comment}</div>
        }

        <div
          className="footer flex gap-4 text-indigo-500"
        >
          <IconBtn Empty={FaRegHeart} Filled={FaHeart} aria-label="like">
            {comment.likes}
          </IconBtn>
          <IconBtn Empty={FaReply} Filled={FaTimes} aria-label="reply" />
          <IconBtn Empty={FaEdit} Filled={FaPencilAlt} aria-label="edit" isEditing={isEditing} handleClick={handleEditBtn} />
          <IconBtn Empty={FaTrash} Filled={FaTrash} aria-label="delete" handleClick={handleDelete} />
        </div>
      </div>
    </>
  )
}

export default Comment