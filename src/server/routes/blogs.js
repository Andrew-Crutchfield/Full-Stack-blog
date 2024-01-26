"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbUtils_1 = require("../utils/dbUtils");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
// GET all blogs
router.get('/', async (_req, res) => {
    try {
        const sql = 'SELECT * FROM blogs;';
        const blogs = await (0, dbUtils_1.executeQuery)(sql);
        res.json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});
// GET a single blog by ID
router.get('/:id', async (req, res) => {
    try {
        const sql = 'SELECT * FROM blogs WHERE id = ?;';
        const blog = await (0, dbUtils_1.executeQuery)(sql, [req.params.id]);
        res.json(blog);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});
// POST a new blog
router.post('/', [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('content').notEmpty().withMessage('Content is required'),
    (0, express_validator_1.body)('authorid').isNumeric().withMessage('Author ID must be numeric'),
], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, content, authorid } = req.body;
    try {
        const sql = 'INSERT INTO blogs (title, content, authorid) VALUES (?, ?, ?);';
        const result = await (0, dbUtils_1.executeQuery)(sql, [title, content, authorid]);
        res.status(201).json({ message: 'Blog created', blogId: result.insertId });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});
// PUT to update a blog by ID
router.put('/:id', [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('content').notEmpty().withMessage('Content is required'),
    // You may want to validate 'authorid' or other fields as well
], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, content } = req.body;
    try {
        const sql = 'UPDATE blogs SET title = ?, content = ? WHERE id = ?;';
        await (0, dbUtils_1.executeQuery)(sql, [title, content, req.params.id]);
        res.json({ message: 'Blog updated' });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});
// DELETE a blog by ID
router.delete('/:id', async (req, res) => {
    try {
        const sql = 'DELETE FROM blogs WHERE id = ?;';
        await (0, dbUtils_1.executeQuery)(sql, [req.params.id]);
        res.json({ message: 'Blog deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=blogs.js.map