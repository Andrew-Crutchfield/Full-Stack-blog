import express, { Request, Response } from 'express';
import { executeSelectQuery, executeModifyQuery } from '../utils/dbUtils'; // Adjust the import paths as necessary
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        const sql = 'SELECT * FROM blogs;';
        const blogs = await executeSelectQuery(sql);
        res.json(blogs);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const sql = 'SELECT * FROM blogs WHERE id = ?;';
        const blog = await executeSelectQuery(sql, [req.params.id]);
        if (Array.isArray(blog) && blog.length === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog[0] || blog);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

router.post(
    '/',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('content').notEmpty().withMessage('Content is required'),
        body('authorid').isNumeric().withMessage('Author ID must be numeric'),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, content, authorid } = req.body;
        try {
            const sql = 'INSERT INTO blogs (title, content, authorid) VALUES (?, ?, ?);';
            const result = await executeModifyQuery(sql, [title, content, authorid]);
            res.status(201).json({ message: 'Blog created', blogId: result.insertId });
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'Server error' });
        }
    }
);

router.put(
    '/:id',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('content').notEmpty().withMessage('Content is required'),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, content } = req.body;
        try {
            const sql = 'UPDATE blogs SET title = ?, content = ? WHERE id = ?;';
            await executeModifyQuery(sql, [title, content, req.params.id]);
            res.json({ message: 'Blog updated' });
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'Server error' });
        }
    }
);

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const sql = 'DELETE FROM blogs WHERE id = ?;';
        await executeModifyQuery(sql, [req.params.id]);
        res.json({ message: 'Blog deleted' });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

router.get('/author/:authorId', async (req: Request, res: Response) => {
    try {
        const authorId = req.params.authorId;
        const sql = 'SELECT * FROM blogs WHERE authorId = ?;';
        const blogs = await executeSelectQuery(sql, [authorId]);
        res.json(blogs);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

export default router;