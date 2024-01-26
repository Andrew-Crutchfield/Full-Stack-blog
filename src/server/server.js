"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const blogs_1 = __importDefault(require("./routes/blogs"));
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const app = (0, express_1.default)();
// Apply CORS for development environment
if (isDevelopment) {
    app.use((0, cors_1.default)());
}
// Serve static files in production environment
if (isProduction) {
    app.use(express_1.default.static('public'));
}
// API routes
app.use('/api/blogs', blogs_1.default);
app.get('/api/hello', (req, res) => {
    res.json({ message: 'World' });
});
// 404 fallback for client-side routing in production environment
if (isProduction) {
    app.get('*', (req, res) => {
        res.sendFile('index.html', { root: 'public' });
    });
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=server.js.map