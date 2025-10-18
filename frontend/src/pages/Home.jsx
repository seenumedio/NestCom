import React from 'react';
import PostCard from '../components/PostCard';
import { useGetAllPostsQuery } from '../features/posts/postApi';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
function Home() {
  const { data: posts, isLoading, isError } = useGetAllPostsQuery() || {};

  if (isLoading) return <Spinner />
  if (isError) return <p>Error fetching posts.</p>;
  if (!posts?.length) return <p>No posts available.</p>;

  return (
    <div className='w-[100vw] flex flex-col items-center'>
      <Navbar />
        <div className='py-4 w-[90%] columns-1 sm:columns-2 md:columns-3 gap-4'>
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
      </div>
    </div>
  );
}

export default Home;
