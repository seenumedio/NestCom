import { useState } from 'react'
import { useAddCommentMutation } from '../features/comments/commentApi';
import { Loader } from './Spinner'

function CommentForm({ loading, error, autoFocus = false, postId, handleEdit, handleReply, parentId, mssg }) {

    // fetching admin details
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [comment, setComment] = useState(mssg || '');
    // adding comment
    const [addComment, { isLoading: addLoading }] = useAddCommentMutation() || {}
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) return alert("Please login to comment");
        if (handleEdit) {
            handleEdit(comment)
        } else {
            addComment({
                postId,
                data: {
                    postId,
                    username: user.username,
                    comment,
                    parentId: parentId || null,
                }
            })
        }
        setComment('');
        if (handleReply) {
            handleReply();
        }
    }
    const loader = loading || addLoading;
    return (
        <form
            onSubmit={handleSubmit}
        >
            <div className='w-full flex justify-between gap-2'>
                {loader
                    ? <Loader loading={loader} />
                    : <textarea
                        autoFocus={autoFocus}
                        value={comment}
                        required
                        onChange={(e) => setComment(e.target.value)}
                        className='w-full p-2 resize-none border-2 border-indigo-500/90 rounded-md'>
                    </textarea>
                }
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