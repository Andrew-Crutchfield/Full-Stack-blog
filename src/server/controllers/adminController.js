const { executeSelectQuery, executeModifyQuery } = require('../utils/dbUtils');

exports.getPosts = async (req, res) => {
  const sql = 'SELECT * FROM posts';
  try {
    const posts = await executeSelectQuery(sql);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

exports.createNewPost = async (req, res) => {
  const { title, content, authorId } = req.body;
  const sql = 'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)';
  try {
    const result = await executeModifyQuery(sql, [title, content, authorId]);
    res.status(201).json({ postId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { title, content } = req.body;
  const postId = req.params.id;
  const sql = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
  try {
    await executeModifyQuery(sql, [title, content, postId]);
    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  const sql = 'DELETE FROM posts WHERE id = ?';
  try {
    await executeModifyQuery(sql, [postId]);
    res.status(204).end(); 
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  const postId = req.params.id;
  const sql = 'SELECT * FROM posts WHERE id = ?';
  try {
    const post = await executeSelectQuery(sql, [postId]);
    if (post.length > 0) {
      res.json(post[0]);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
};

exports.getTags = async (req, res) => {
  const sql = 'SELECT * FROM tags'; 
  try {
    const tags = await executeSelectQuery(sql);
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tags', error: error.message });
  }
};

exports.createTag = async (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO tags (name) VALUES (?)';
  try {
    const result = await executeModifyQuery(sql, [name]);
    res.status(201).json({ tagId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating tag', error: error.message });
  }
};

exports.updateTag = async (req, res) => {
  const { name } = req.body;
  const tagId = req.params.id;
  const sql = 'UPDATE tags SET name = ? WHERE id = ?';
  try {
    await executeModifyQuery(sql, [name, tagId]);
    res.json({ message: 'Tag updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating tag', error: error.message });
  }
};

exports.deleteTag = async (req, res) => {
  const tagId = req.params.id;
  const sql = 'DELETE FROM tags WHERE id = ?';
  try {
    await executeModifyQuery(sql, [tagId]);
    res.status(204).end(); 
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tag', error: error.message });
  }
};