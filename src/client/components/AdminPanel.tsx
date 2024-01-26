import React, { useState, useEffect } from 'react';
import { fetchBlogs, deleteBlog } from '../services/apiServices'; 

type BlogPost = {
  id: number;
  title: string;
  content: string;
};

const AdminPanel: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]); // Rename to blogs for clarity
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    fetchBlogs() 
      .then((data) => {
        setBlogs(data); 
        setLoading(false);
      })
      .catch((e) => {
        console.error('Error fetching blogs', e);
        setError('Failed to load blogs. Please try again.');
        setLoading(false);
      });
  }, []);

  const handleDelete = (blogId: number) => {
    deleteBlog(blogId) 
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== blogId));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      {blogs.map((blog) => ( 
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;