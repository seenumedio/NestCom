import { motion } from 'framer-motion'
import CommentsList from '../components/CommentsList'
import CommentForm from '../components/CommentForm'
import { useGetCommentsQuery } from '../features/comments/commentApi';
import { useParams } from 'react-router-dom';

function PostDetail() {

  // fetching all comments
  const {postId} = useParams();
  const { data: comments, isLoading: commentLoading, isError: commentError } = useGetCommentsQuery(postId) || {};

  return (
    <>
      <div className='w-[90vw] h-full flex justify-between my-4 p-4 rounded-sm bg-neutral-100 shadow-lg'>
        <div className='w-[50%] flex flex-col p-4 justify-around'>
          <h1 className='text-5xl font-bold'>Title</h1>
          <p className='text-md font-light max-h-[40vh] overflow-scroll'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus deleniti ea aliquam nam, quam maxime nobis cumque expedita eius aliquid perspiciatis laboriosam explicabo. Soluta tenetur, eum similique modi ea numquam molestias quaerat nam quam atque aperiam autem illo dolores nisi iste sequi pariatur exercitationem temporibus excepturi distinctio accusamus impedit libero eos! Odit aut illo fuga labore, in sunt, ullam magni, inventore cum minima atque non repudiandae. Reprehenderit assumenda placeat voluptate, odio voluptas nemo minima voluptatibus, velit ut quos harum deleniti iste. Quae, dolores. Neque repudiandae ducimus eos, corrupti nam nulla reiciendis quasi reprehenderit inventore modi qui cumque alias expedita nihil.</p>
          <div className='icons'></div>
        </div>
        <motion.div
          className='relative w-[50%] h-[60vh]'
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className='cursor-pointer h-10 w-10 hover:scale-104 opacity-50 hover:shadow-md absolute top-4 left-4 bg-cover bg-center bg-[url(/src/assets/FavIcon.png)]'
          >
          </button>
          <img
            src="/src/assets/AI.png"
            alt=""
            className='h-full w-full object-cover rounded-md'
          />
        </motion.div>
      </div>
      <CommentForm loading={commentLoading} error={commentError} autoFocus postId={postId} />
      <CommentsList comments={comments} />
    </>
  )
}

export default PostDetail