"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Diagram_1 = __importDefault(require("./HomeComponents/Diagram"));
var Header_1 = __importDefault(require("./HomeComponents/Header"));
var InputContainer_1 = __importDefault(require("./HomeComponents/InputContainer"));
var QueryResults_1 = __importDefault(require("./HomeComponents/QueryResults"));
var react_split_1 = __importDefault(require("react-split"));
var react_router_dom_1 = require("react-router-dom");
var TopComp = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    return ((0, jsx_runtime_1.jsxs)(react_split_1.default, __assign({ className: "flex", sizes: [30, 70], minSize: [300, 300] }, { children: [(0, jsx_runtime_1.jsx)(InputContainer_1.default, {}), (0, jsx_runtime_1.jsx)(Diagram_1.default, {})] })));
};
var Homepage = function () {
    //TODO: FETCH to authenticate Token: 401 not authenticated | 200 Sucess | 400 server error
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)("div", __assign({ className: "main-container" }, { children: (0, jsx_runtime_1.jsxs)(react_split_1.default, __assign({ className: 'main-container-split', direction: "vertical", sizes: [70, 30], minSize: [200, 100], gutterSize: 5 }, { children: [(0, jsx_runtime_1.jsx)(TopComp, {}), (0, jsx_runtime_1.jsx)(QueryResults_1.default, {})] })) }))] }));
};
exports.default = Homepage;
