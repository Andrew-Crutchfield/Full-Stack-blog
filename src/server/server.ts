require('dotenv').config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import blogRoutes from './routes/blogs';
import authorsRouter from './routes/authors';
import tagsRouter from './routes/tags';
import blogTagsRouter from './routes/blogtags';
import blogsWithTagsRouter from './routes/blogsWithTags';
import adminRoutes from './routes/adminRoutes';
import emailRouter from './routes/email'; 
import { protect } from './middleware/authMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRoutes);
app.use('/api/authors', authorsRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/blogtags', blogTagsRouter);
app.use('/api/blogsWithTags', blogsWithTagsRouter);
app.use('/admin', protect, adminRoutes);
app.use('/contact-us', emailRouter); 

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello World!' });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
} else {
    app.get('*', (req, res) => {
        res.redirect('http://localhost:3000');
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});