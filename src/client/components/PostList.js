"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const PostPreview_1 = __importDefault(require("./PostPreview"));
const PostList = ({ posts }) => {
    return (<div>
      {posts.map((post) => (<PostPreview_1.default key={post.id} post={post}/>))}
    </div>);
};
exports.default = PostList;
//# sourceMappingURL=PostList.js.map