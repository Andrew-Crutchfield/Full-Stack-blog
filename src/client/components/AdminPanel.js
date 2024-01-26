"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const AdminPanel = () => {
    const [posts, setPosts] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        // Fetch all blog posts from your API
        setLoading(true);
        fetch('http://localhost:3000/api/posts')
            .then((res) => res.json())
            .then((data) => {
            setPosts(data);
            setLoading(false);
        })
            .catch((e) => {
            console.error('Error fetching posts', e);
            setError('Failed to load posts. Please try again.');
            setLoading(false);
        });
    }, []);
    const handleDelete = (postId) => {
        // Call API to delete the post
        fetch(`http://localhost:3000/api/posts/${postId}`, {
            method: 'DELETE',
        })
            .then(response => {
            if (response.ok) {
                setPosts(posts.filter(post => post.id !== postId));
            }
            else {
                throw new Error('Failed to delete the post.');
            }
        })
            .catch(error => {
            console.error('Error:', error);
        });
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (<div>
      <h1>Admin Panel</h1>
      {posts.map((post) => (<div key={post.id}>
          <h2>{post.title}</h2>
          {/* Display other post details as needed */}
          <button onClick={() => handleDelete(post.id)}>Delete</button>
          {/* Add an edit button/link that navigates to an edit page or opens an edit form */}
        </div>))}
    </div>);
};
exports.default = AdminPanel;
//# sourceMappingURL=AdminPanel.js.map