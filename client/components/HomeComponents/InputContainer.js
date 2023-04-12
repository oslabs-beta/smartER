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
var react_1 = require("react");
var QueryInput_1 = __importDefault(require("./InputContainerComponents/QueryInput"));
var Settings_1 = __importDefault(require("./InputContainerComponents/Settings"));
var InputContainer = function () {
    var _a = (0, react_1.useState)('Settings'), tab = _a[0], setTab = _a[1];
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "input-container" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "tab-container" }, { children: [(0, jsx_runtime_1.jsx)("button", __assign({ className: tab === 'Settings' ? 'tabs active-tabs' : 'tabs', onClick: function () { return setTab('Settings'); } }, { children: "Settings" })), (0, jsx_runtime_1.jsx)("button", __assign({ className: tab === 'Query' ? 'tabs active-tabs' : 'tabs', onClick: function () { return setTab('Query'); } }, { children: "Query" }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "tab-content" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: tab === 'Query' ? 'content active-content' : 'content' }, { children: (0, jsx_runtime_1.jsx)(QueryInput_1.default, {}) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: tab === 'Settings' ? 'content active-content' : 'content' }, { children: (0, jsx_runtime_1.jsx)(Settings_1.default, { setTab: setTab }) }))] }))] })));
};
exports.default = InputContainer;
