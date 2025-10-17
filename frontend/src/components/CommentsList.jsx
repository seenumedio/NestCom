import React from 'react'
import Comment from './Comment'

function CommentsList({ comments }) {

  return (
    <>
      {comments?.length >= 0 && comments?.map(comment => {
        return <Comment key={comment._id} comment={comment} />
      })}
    </>
  )
}

export default CommentsList