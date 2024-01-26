import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Blog, Author } from '../types'; 

const PostDetailPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const { postId } = useParams<{ postId: string }>(); 

  useEffect(() => {
    fetch('http://localhost:3000/api/authors')
      .then((res) => res.json())
      .then(setAuthors)
      .catch((error) => console.error('Error fetching authors', error));
  }, []);

  useEffect(() => {
    if (postId) {
      fetch(`http://localhost:3000/api/blogs/${postId}`)
        .then((res) => res.json())
        .then((blog) => {
          setSelectedBlog(blog);
        })
        .catch((error) => console.error('Error fetching blog post', error));
    }
  }, [postId]);

  return (
    <div>
      <h1>Post Details</h1>
      <h2>Authors</h2>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <Link to={`/author/${author.id}`}>{author.name}</Link>
          </li>
        ))}
      </ul>
      {selectedBlog && (
        <>
          <h2>{selectedBlog.title}</h2>
          <p>By {authors.find((author) => author.id === selectedBlog.authorid)?.name || 'Unknown author'}</p>
          <p>Date: {new Date(selectedBlog.createdAt).toLocaleDateString()}</p>
          <div>{selectedBlog.content}</div>
        </>
      )}
    </div>
  );
};

export default PostDetailPage;
