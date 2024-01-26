import express, { Request, Response } from 'express';
import { executeSelectQuery } from '../utils/dbUtils'; 

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        const sql = `
            SELECT bt.blogid, b.title, t.name as tagname
            FROM blogtags bt
            JOIN blogs b ON bt.blogid = b.id
            JOIN tags t ON bt.tagid = t.id;
        `;
        const blogtags = await executeSelectQuery(sql);
        res.json(blogtags);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

router.get('/blog/:blogid', async (req: Request, res: Response) => {
    try {
        const sql = `
            SELECT t.id, t.name
            FROM tags t
            JOIN blogtags bt ON t.id = bt.tagid
            WHERE bt.blogid = ?;
        `;
        const tagsForBlog = await executeSelectQuery(sql, [req.params.blogid]);
        res.json(tagsForBlog);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

router.get('/tag/:tagid', async (req: Request, res: Response) => {
    try {
        const sql = `
            SELECT b.id, b.title
            FROM blogs b
            JOIN blogtags bt ON b.id = bt.blogid
            WHERE bt.tagid = ?;
        `;
        const blogsForTag = await executeSelectQuery(sql, [req.params.tagid]);
        res.json(blogsForTag);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

export default router;