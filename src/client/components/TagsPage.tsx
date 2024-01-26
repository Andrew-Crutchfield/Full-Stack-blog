import React, { useState, useEffect } from 'react';
import Tag, { TagType } from './Tag'; 

type BlogPostType = {
  id: number;
  title: string;
};

type BlogPostWithTags = {
  post: BlogPostType;
  tags: TagType[];
};

const TagsPage: React.FC = () => {
  const [blogPostsWithTags, setBlogPostsWithTags] = useState<BlogPostWithTags[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/api/blogsWithTags') 
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setBlogPostsWithTags(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error('Error fetching blog posts and tags', e);
        setError('Could not fetch blog posts and tags. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleSelectTag = (tagId: number) => {
    console.log('Selected tag with ID:', tagId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {blogPostsWithTags.map((item) => (
        <div key={item.post.id} className="blog-post-with-tags">
          <h2>{item.post.title}</h2>
          <div className="tags-container">
            {item.tags.map((tag) => (
              <Tag key={tag.id} tag={tag} onSelectTag={handleSelectTag} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TagsPage;
