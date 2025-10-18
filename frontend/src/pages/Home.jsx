import React from 'react';
import Masonry from 'react-masonry-css';
import PostCard from '../components/PostCard';
import { useGetAllPostsQuery } from '../features/posts/postApi';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
  const { data: posts, isLoading, isError } = useGetAllPostsQuery() || {};
  if (!posts?.length) return null;

  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1
  };

  return (
    <div className='w-[100vw] flex flex-col items-center'>
      <Navbar />
      <div className='py-4 w-[90%]'>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-2 w-auto"
          columnClassName="pl-2 bg-clip-padding"
        >
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </Masonry>
      </div>
    </div>
  );
}

export default Home;
