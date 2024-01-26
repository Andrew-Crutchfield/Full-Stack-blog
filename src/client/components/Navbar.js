"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Navbar = () => {
    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
      <react_router_dom_1.Link className="navbar-brand" to="/">
        My Blog
      </react_router_dom_1.Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <react_router_dom_1.Link className="nav-link" to="/">
              Home
            </react_router_dom_1.Link>
          </li>
          <li className="nav-item">
            <react_router_dom_1.Link className="nav-link" to="/compose">
              Compose
            </react_router_dom_1.Link>
          </li>
          {/* ...other nav items... */}
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <react_router_dom_1.Link className="nav-link" to="/login">
              Login
            </react_router_dom_1.Link>
          </li>
          <li className="nav-item">
            <react_router_dom_1.Link className="nav-link" to="/register">
              Register
            </react_router_dom_1.Link>
          </li>
        </ul>
      </div>
    </nav>);
};
exports.default = Navbar;
//# sourceMappingURL=Navbar.js.map