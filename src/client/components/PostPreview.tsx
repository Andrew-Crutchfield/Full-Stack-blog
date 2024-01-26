import React from 'react';
import { Link } from 'react-router-dom';

type BlogPost = {
  id: number;
  title: string;
  content: string;
};

interface PostPreviewProps {
  post: BlogPost;
}

const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  return (
    <div className="post-preview">
      <Link to={`/posts/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      <p>{post.content.substring(0, 100)}...</p>
      <Link to={`/posts/${post.id}`}>Read More</Link>
    </div>
  );
};

export default PostPreview;