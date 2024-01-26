import React, { useState, useEffect } from 'react';
import PostPreview from './PostPreview';

type BlogPost = {
  id: number;
  title: string;
  content: string;
};

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    console.log('Fetching posts...');
    fetch('/api/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Posts fetched:', data);
        setPosts(data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;