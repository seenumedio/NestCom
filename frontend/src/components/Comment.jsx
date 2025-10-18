import { FaHeart, FaRegHeart, FaEdit, FaTrash, FaPencilAlt, FaReply, FaTimes } from 'react-icons/fa'
import IconBtn from './IconBtn'
import { useDeleteCommentMutation, useUpdateCommentMutation, useLikeCommentMutation } from '../features/comments/commentApi'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import CommentForm from './CommentForm'
import { toast } from 'react-toastify';
import { Loader } from './Spinner'


function Comment({ comment }) {

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

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
  async function handleDelete() {
    try {
      await deleteComment({ postId, commentId }).unwrap();
      toast.success('Comment deleted successfully!', { delay: 1000, position: 'bottom-left' });
    } catch (err) {
      toast.error('Failed to delete comment', { position: 'bottom-left' });
      console.error(err);
    }
  }

  // edit comment
  const [editComment, { isLoading: editLoading }] = useUpdateCommentMutation() || {}
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
  // reply to a comment
  const [isReplying, setIsReplying] = useState(false);
  function handleReply() {
    setIsReplying(prev => !prev);
  }
  // like comment
  const [likes, setLikes] = useState(comment.likes);
  const [likedBy, setLikedBy] = useState(comment.likedBy);
  const [likeComment] = useLikeCommentMutation() || {};
  function handleLike() {
    let updatedLikes = likes;
    let updatedLikedBy = [...likedBy];

    if (!likedBy.includes(user.username)) {
      updatedLikedBy.push(user.username);
      updatedLikes++;
    } else {
      updatedLikedBy = updatedLikedBy.filter(liker => liker !== user.username);
      updatedLikes--;
    }

    setLikes(updatedLikes);
    setLikedBy(updatedLikedBy);

    likeComment({
      postId,
      commentId,
      data: {
        likes: updatedLikes,
        likedBy: updatedLikedBy,
      }
    });
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
              user={user}
            />
          </div>
          : editLoading
          ? <Loader />
          : <div className='mssg p-2 text-black'>{comment.comment}</div>
        }

        <div
          className="footer flex gap-4 text-indigo-500"
        >
          <IconBtn Empty={FaRegHeart} Filled={FaHeart} aria-label="like" handleClick={handleLike}>
            {likes}
          </IconBtn>
          <IconBtn Empty={FaReply} Filled={FaTimes} aria-label="reply" isReplying={isReplying} handleClick={handleReply} />
          {user?.username === comment.username &&
            <>
              <IconBtn Empty={FaEdit} Filled={FaPencilAlt} aria-label="edit" isEditing={isEditing} handleClick={handleEditBtn} />
              <IconBtn Empty={FaTrash} Filled={FaTrash} aria-label="delete" handleClick={handleDelete} />
            </>
          }
        </div>

      </div>
      {isReplying &&
        <div className='pl-4 border-l-2 border-neutral-400/50'>
          <CommentForm
            autoFocus={true}
            parentId={commentId}
            postId={postId}
            handleReply={handleReply}
          />
        </div>
      }

    </>
  )
}

export default Comment