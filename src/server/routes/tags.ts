import express, { Request, Response } from 'express';
import { executeSelectQuery, executeModifyQuery } from '../utils/dbUtils'; 
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        const sql = 'SELECT * FROM tags;';
        const tags = await executeSelectQuery(sql);
        res.json(tags);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const sql = 'SELECT * FROM tags WHERE id = ?;';
        const tag = await executeSelectQuery(sql, [req.params.id]);
        if (Array.isArray(tag) && tag.length === 0) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.json(tag[0] || tag);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

router.post(
    '/',
    [body('name').notEmpty().withMessage('Name is required')],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name } = req.body;
        try {
            const sql = 'INSERT INTO tags (name) VALUES (?);';
            const result = await executeModifyQuery(sql, [name]);
            res.status(201).json({ message: 'Tag created', tagId: result.insertId });
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'Server error' });
        }
    }
);

router.put(
    '/:id',
    [body('name').notEmpty().withMessage('Name is required')],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name } = req.body;
        try {
            const sql = 'UPDATE tags SET name = ? WHERE id = ?;';
            await executeModifyQuery(sql, [name, req.params.id]);
            res.json({ message: 'Tag updated' });
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'Server error' });
        }
    }
);

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const sql = 'DELETE FROM tags WHERE id = ?;';
        await executeModifyQuery(sql, [req.params.id]);
        res.json({ message: 'Tag deleted' });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

export default router;