"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CommentList = ({ comments }) => {
    return (<div>
      {comments.map((comment) => (<div key={comment.id}>
          <strong>{comment.author}</strong>
          <p>{comment.content}</p>
        </div>))}
    </div>);
};
exports.default = CommentList;
//# sourceMappingURL=CommentList.js.map