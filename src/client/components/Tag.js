"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Tag = ({ tag, onSelectTag }) => {
    return (<span className="tag" onClick={() => onSelectTag(tag.id)}>
      {tag.name}
    </span>);
};
exports.default = Tag;
//# sourceMappingURL=Tag.js.map