import express, { Request, Response } from 'express';
import { executeSelectQuery } from '../utils/dbUtils'; 

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        const sql = `
            SELECT 
                blogs.id as blogId,
                blogs.title,
                tags.id as tagId,
                tags.name as tagName
            FROM blogs
            LEFT JOIN blogtags ON blogs.id = blogtags.blogid
            LEFT JOIN tags ON blogtags.tagid = tags.id;
        `;

        const results = await executeSelectQuery(sql);

        const blogPostsWithTags = results.reduce((acc, current) => {
            let blogPost = acc.find(b => b.post.id === current.blogId);
            if (blogPost) {
                if (current.tagId) {
                    blogPost.tags.push({ id: current.tagId, name: current.tagName });
                }
            } else {
                acc.push({
                    post: {
                        id: current.blogId,
                        title: current.title,
                    },
                    tags: current.tagId ? [{ id: current.tagId, name: current.tagName }] : []
                });
            }
            return acc;
        }, []);

        res.json(blogPostsWithTags);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

export default router;
