import React from 'react';
import Comment from './Comment';

function CommentsList({ comments, parentId = null }) {
  // Filter comments that are children of the current parentId
  const currentComments = comments?.filter(c => c.parentId === parentId);

  if (!currentComments?.length) return null;

  return (
    <>
      {currentComments.map(comment => (
        <div key={comment._id} className={parentId ? 'pl-4 border-l-2 border-neutral-400/50' : ''}>
          <Comment comment={comment} />
          {/* Render nested replies recursively */}
          <CommentsList comments={comments} parentId={comment._id} />
        </div>
      ))}
    </>
  );
}

export default CommentsList;
