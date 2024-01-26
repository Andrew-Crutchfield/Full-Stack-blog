"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const PostPreview = ({ post }) => {
    return (<div className="post-preview">
      <react_router_dom_1.Link to={`/posts/${post.id}`}>
        <h3>{post.title}</h3>
      </react_router_dom_1.Link>
      <p>{post.content.substring(0, 100)}...</p>
      {/* Truncate content and display a 'Read More' link */}
      <react_router_dom_1.Link to={`/posts/${post.id}`}>Read More</react_router_dom_1.Link>
    </div>);
};
exports.default = PostPreview;
//# sourceMappingURL=PostPreview.js.map