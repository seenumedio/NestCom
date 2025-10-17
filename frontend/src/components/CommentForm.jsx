import { useState } from 'react'
import { useAddCommentMutation } from '../features/comments/commentApi';

function CommentForm({ loading, error, autoFocus = false, postId }) {

    const [comment, setComment] = useState('');

    // adding comment
    const [addComment] = useAddCommentMutation() || {}
    const handleSubmit = (e) => {
        e.preventDefault();
        addComment({
            postId,
            data: {
                postId,
                username: 'admin',
                comment,
            }
        })
        setComment('');
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='my-6'
        >
            <h1 className='text-2xl font-semibold my-2'>Comments</h1>
            <div className='w-full flex justify-between gap-2'>
                <textarea
                    autoFocus={autoFocus}
                    value={comment}
                    required
                    onChange={(e) => setComment(e.target.value)}
                    className='w-full p-2 resize-none border-2 border-indigo-500/90 rounded-md'></textarea>
                <button
                    className='bg-indigo-600 p-3 cursor-pointer rounded-sm text-white disabled:bg-neutral-500 hover:bg-indigo-500 hover:scale-102'
                    disabled={loading}
                    type="submit"
                >
                    {loading ? 'Loading' : 'Post'}
                </button>
            </div>
            <p className='text-red-500 text-lg'>{error}</p>
        </form>
    )
}

export default CommentForm