import React from 'react'
import PostCard from '../components/PostCard'
import { useGetAllPostsQuery } from '../features/posts/postApi'
import { NavLink } from 'react-router-dom';
function Home() {
  const { data: posts, isLoading: commentLoading, isError: commentError } = useGetAllPostsQuery() || {};
  if (!posts?.length) return null
  return (
    <div className='py-4 h-full grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {posts.map(post => (
        <NavLink
          key={post._id}
          to={`/post/${post._id}`}
        >
          <PostCard post={post} />
        </NavLink>
      ))}
    </div>
  )
}

export default Home