"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ErrorMessage = ({ message }) => {
    return (<div className="alert alert-danger" role="alert">
      {message}
    </div>);
};
exports.default = ErrorMessage;
//# sourceMappingURL=ErrorMessage.js.map