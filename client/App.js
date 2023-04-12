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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Context_1 = require("./Context");
var Homepage_1 = __importDefault(require("./components/Homepage"));
var Landingpage_1 = __importDefault(require("./components/Landingpage"));
var App = function () {
    var _a = (0, react_1.useState)(false), submit = _a[0], setSubmit = _a[1];
    var _b = (0, react_1.useState)(''), queryString = _b[0], setQueryString = _b[1];
    var _c = (0, react_1.useState)(''), uri = _c[0], setUri = _c[1];
    var _d = (0, react_1.useState)(''), savedUri = _d[0], setSavedUri = _d[1];
    var _e = (0, react_1.useState)({
        host: '',
        port: 0,
        dbUsername: '',
        dbPassword: '',
        database: '',
    }), dbCredentials = _e[0], setDBCredentials = _e[1];
    var _f = (0, react_1.useState)([]), queryResponse = _f[0], setQueryResponse = _f[1];
    var _g = (0, react_1.useState)({}), masterData = _g[0], setMasterData = _g[1];
    var _h = (0, react_1.useState)({}), renderedData = _h[0], setRenderedData = _h[1];
    var _j = (0, react_1.useState)({}), renderedDataPositions = _j[0], setRenderedDataPositions = _j[1];
    var _k = (0, react_1.useState)(['']), errorMessages = _k[0], setErrorMessages = _k[1];
    var _l = (0, react_1.useState)(false), reset = _l[0], setReset = _l[1];
    return ((0, jsx_runtime_1.jsx)(Context_1.HomepageContext.Provider, __assign({ value: {
            submit: submit,
            setSubmit: setSubmit,
            queryString: queryString,
            setQueryString: setQueryString,
            uri: uri,
            setUri: setUri,
            savedUri: savedUri,
            setSavedUri: setSavedUri,
            dbCredentials: dbCredentials,
            setDBCredentials: setDBCredentials,
            queryResponse: queryResponse,
            setQueryResponse: setQueryResponse,
            masterData: masterData,
            setMasterData: setMasterData,
            renderedData: renderedData,
            setRenderedData: setRenderedData,
            renderedDataPositions: renderedDataPositions,
            setRenderedDataPositions: setRenderedDataPositions,
            errorMessages: errorMessages,
            setErrorMessages: setErrorMessages,
            reset: reset,
            setReset: setReset,
        } }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Landingpage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/homepage", element: (0, jsx_runtime_1.jsx)(Homepage_1.default, {}) })] }) })));
};
exports.default = App;
