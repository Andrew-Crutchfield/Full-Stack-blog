import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Blog } from '../types'; 

const AuthorPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const { authorId } = useParams<{ authorId: string }>(); 

  useEffect(() => {
    fetch(`http://localhost:3000/api/blogs/author/${authorId}`)
      .then((res) => res.json())
      .then((blogsData) => {
        setBlogs(blogsData);
        if (blogsData.length > 0) {
          setSelectedBlog(blogsData[0]);
        }
      })
      .catch((error) => console.error('Error fetching blogs for the author', error));
  }, [authorId]);

  const handleBlogSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBlogId = parseInt(event.target.value, 10);
    const blog = blogs.find((b) => b.id === selectedBlogId) || null;
    setSelectedBlog(blog);
  };

  return (
    <div>
      <h1>Author's Blogs</h1>
      <select onChange={handleBlogSelection} value={selectedBlog?.id ?? ''}>
        <option value="">Select a Blog</option>
        {blogs.map((blog) => (
          <option key={blog.id} value={blog.id}>
            {blog.title}
          </option>
        ))}
      </select>
      {selectedBlog && (
        <div>
          <h2>{selectedBlog.title}</h2>
          <p>{selectedBlog.content}</p>
        </div>
      )}
    </div>
  );
};

export default AuthorPage;
