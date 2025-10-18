import { motion } from 'framer-motion'
import CommentsList from '../components/CommentsList'
import CommentForm from '../components/CommentForm'
import { useGetCommentsQuery } from '../features/comments/commentApi';
import { useGetSpecificPostQuery } from '../features/posts/postApi';
import { useParams, NavLink } from 'react-router-dom';
import Spinner from '../components/Spinner';

function PostDetail() {
  const { postId } = useParams();
  // fetching post
  const { data: post, isLoading: postLoading, isError: postError } = useGetSpecificPostQuery(postId) || {};
  if (postError) return <p>Error fetching post.</p>;
  // fetching all comments  
  const { data: comments, isLoading: commentLoading, isError: commentError } = useGetCommentsQuery(postId) || {};
  const commentsCount = comments?.length || 0;
  return (
    <div className='mb-10'>
      {postLoading ? <Spinner /> :
        <div className='w-[90vw] relative h-full flex flex-col sm:flex-row justify-between my-4 md:p-4 p-2 rounded-sm bg-neutral-100 shadow-lg'>
          <NavLink
            to='/'
            className='absolute md:left-8 md:p-0 px-2 text-lg hover:scale-102 text-indigo-500'
          >{'←Home'}
          </NavLink>
          <div className='sm:w-[50%] flex flex-col my-6 md:my-2 md:p-4 p-2 justify-around gap-4 sm:gap-0'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold'>{post.title}</h1>
            <p className='text-md font-light max-h-[40vh] overflow-scroll'>{post.description}</p>
            <span className='text-lg font-semibold'>Author: {post.author}</span>
          </div>
          <motion.div
            className='relative sm:w-[50%] h-[60vh]'
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className='cursor-pointer h-10 w-10 hover:scale-104 opacity-50 hover:shadow-md absolute top-4 left-4 bg-cover bg-center bg-[url(/src/assets/FavIcon.png)]'
            >
            </button>
            <img
              src={`${post.image}`}
              alt=""
              className='h-full w-full object-cover rounded-md'
            />
          </motion.div>
        </div>
      }
      <div className='w-[90vw] my-8'>
        <h1 className='text-2xl font-semibold my-2'>Comments({commentsCount})</h1>
        <CommentForm loading={commentLoading} error={commentError} autoFocus postId={postId} />
      </div>
      {commentError ? <p>Error fetching comments.</p> : <CommentsList comments={comments} />}
    </div>
  )
}

export default PostDetail