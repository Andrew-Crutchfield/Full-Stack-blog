
const API_BASE_URL = 'http://localhost:3000/api';

export const fetchBlogs = async () => {
  const response = await fetch(`${API_BASE_URL}/blogs`);
  if (!response.ok) {
    throw new Error('Error fetching blogs'); 
  }
  return response.json();
};

export const deleteBlog = async (blogId: number) => {
  const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, { 
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete the blog.'); 
  }
};

export const saveBlog = async (title: string, content: string, blogId?: number) => {
  const response = await fetch(`${API_BASE_URL}/blogs${blogId ? `/${blogId}` : ''}`, { 
    method: blogId ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });
  if (!response.ok) {
    throw new Error(`Failed to ${blogId ? 'update' : 'create'} the blog.`); 
  }
  return response.json();
};