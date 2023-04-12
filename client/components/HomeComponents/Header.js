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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
// clicking profile modal will openthe option to logout
var Header = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleClick = function (e) {
        e.preventDefault();
        navigate('/');
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "header" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "logo" }), (0, jsx_runtime_1.jsx)("button", __assign({ className: "logout-button", onClick: handleClick }, { children: "back" }))] })));
};
exports.default = Header;
