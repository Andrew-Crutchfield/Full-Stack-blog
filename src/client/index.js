"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const App_1 = __importDefault(require("./App"));
require("./styles/app.scss");
// ESBuild Hot Reload for dev environment only
if (process.env.NODE_ENV === 'development') {
    new EventSource('/esbuild').addEventListener('change', () => location.reload());
}
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(<react_1.default.StrictMode>
		<App_1.default />
	</react_1.default.StrictMode>);
//# sourceMappingURL=index.js.map