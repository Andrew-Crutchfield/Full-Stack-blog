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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
// Update the import paths if necessary
const HomePage_1 = __importDefault(require("./components/HomePage"));
const PostDetailPage_1 = __importDefault(require("./components/PostDetailPage"));
const ComposePage_1 = __importDefault(require("./components/ComposePage"));
const AdminPanel_1 = __importDefault(require("./components/AdminPanel"));
const _404Page_1 = __importDefault(require("./components/404Page")); // Assuming you have a 404 component
const App = (props) => {
    const [data, setData] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        fetch('http://localhost:3000/api/hello')
            .then(res => res.json())
            .then(data => setData(data.message))
            .catch(e => console.log('[fetch error]', e));
    }, []);
    return (<react_router_dom_1.BrowserRouter>
            <div className="mx-auto mt-5 w-25">
                {/* Existing Hello message */}
                <div className="alert alert-info text-center">Hello {data}</div>
                
                {/* Updated routing setup for react-router-dom v6 */}
                <react_router_dom_1.Routes>
                    <react_router_dom_1.Route path="/" element={<HomePage_1.default />}/>
                    <react_router_dom_1.Route path="/posts/:id" element={<PostDetailPage_1.default />}/>
                    <react_router_dom_1.Route path="/compose" element={<ComposePage_1.default />}/>
                    <react_router_dom_1.Route path="/admin" element={<AdminPanel_1.default />}/>
                    {/* Fallback route for unmatched paths */}
                    <react_router_dom_1.Route path="*" element={<_404Page_1.default />}/>
                </react_router_dom_1.Routes>
            </div>
        </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
//# sourceMappingURL=App.js.map