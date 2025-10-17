import { FaHeart, FaRegHeart, FaEdit, FaTrash, FaPencilAlt, FaReply, FaTimes } from 'react-icons/fa'
import IconBtn from './IconBtn'
import { useDeleteCommentMutation } from '../features/comments/commentApi'
import { useParams } from 'react-router-dom'

function Comment({comment}) {
  const [deleteComment] = useDeleteCommentMutation() || {}
  const commentId = comment._id
  const {postId} = useParams()

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

  function handleDelete(){
    deleteComment({
      postId,
      commentId
    })
  }

  return (
    <>
      <div className='comment my-2 border-1 text-indigo-500 border-indigo-400/50 rounded-md p-2'>
        <div className='header flex justify-between text-sm'>
          <span className='username font-bold'>{comment.username}</span>
          <span className='time' style={{color: 'grey'}}>{createdAt}</span>
        </div>
        <div
          className='mssg p-2 text-black'
        >
          {comment.comment}
        </div>
        <div
          className="footer flex gap-4"
        >
          <IconBtn Empty={FaRegHeart} Filled={FaHeart} aria-label="like">
            2
          </IconBtn>
          <IconBtn Empty={FaReply} Filled={FaTimes} aria-label="reply" />
          <IconBtn Empty={FaEdit} Filled={FaPencilAlt} aria-label="reply" />
          <IconBtn Empty={FaTrash} Filled={FaTrash} aria-label="delete" handleClick={handleDelete} />
        </div>
      </div>
    </>
  )
}

export default Comment