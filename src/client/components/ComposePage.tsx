import React, { useState, useEffect } from 'react';
import { Blog, Author } from '../types'; 

const ComposePage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [authorid, setAuthorid] = useState<number | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    // Function to fetch authors from the server
    const fetchAuthors = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/authors');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data: Author[] = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors(); 
  }, []); 

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAuthorid(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Ensure an author is selected
    if (authorid === null) {
      alert('Please select an author.');
      return;
    }

    const postData: Partial<Blog> = {
      title,
      content,
      authorid, 
    };

    fetch('http://localhost:3000/api/blogs', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <h1>Compose New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            className="form-control"
            rows={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <select
            id="author"
            value={authorid ?? ''}
            onChange={handleAuthorChange}
            className="form-control"
            required
          >
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ComposePage;