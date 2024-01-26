"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Tag_1 = __importDefault(require("./Tag"));
const TagList = ({ tags, onSelectTag }) => {
    return (<div className="tag-list">
      {tags.map((tag) => (<Tag_1.default key={tag.id} tag={tag} onSelectTag={onSelectTag}/>))}
    </div>);
};
exports.default = TagList;
//# sourceMappingURL=TagList.js.map