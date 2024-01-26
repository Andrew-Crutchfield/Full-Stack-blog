"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const NotFoundPage = () => {
    return (<div>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <react_router_dom_1.Link to="/">Go Home</react_router_dom_1.Link>
    </div>);
};
exports.default = NotFoundPage;
//# sourceMappingURL=404Page.js.map