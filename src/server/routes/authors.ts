import express, { Request, Response } from 'express';
import { executeSelectQuery, executeModifyQuery } from '../utils/dbUtils';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        const sql = 'SELECT * FROM authors;';
        const authors = await executeSelectQuery(sql);
        res.json(authors);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const sql = 'SELECT * FROM authors WHERE id = ?;';
        const author = await executeSelectQuery(sql, [req.params.id]);
        if (Array.isArray(author) && author.length === 0) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.json(author[0] || author);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

router.get('/:authorId/blogs', async (req: Request, res: Response) => {
    try {
        const authorId = req.params.authorId;
        const sql = 'SELECT * FROM blogs WHERE authorId = ?;';
        const blogs = await executeSelectQuery(sql, [authorId]);
        res.json(blogs);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

router.post(
    '/',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email } = req.body;
        try {
            const sql = 'INSERT INTO authors (name, email) VALUES (?, ?);';
            const result = await executeModifyQuery(sql, [name, email]);
            res.status(201).json({ message: 'Author created', authorId: result.insertId });
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'Server error' });
        }
    }
);

router.put(
    '/:id',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email } = req.body;
        try {
            const sql = 'UPDATE authors SET name = ?, email = ? WHERE id = ?;';
            await executeModifyQuery(sql, [name, email, req.params.id]);
            res.json({ message: 'Author updated' });
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'Server error' });
        }
    }
);

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const sql = 'DELETE FROM authors WHERE id = ?;';
        await executeModifyQuery(sql, [req.params.id]);
        res.json({ message: 'Author deleted' });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

export default router;