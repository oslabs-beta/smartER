"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var client_1 = require("react-dom/client");
var react_1 = __importDefault(require("react"));
var App_1 = __importDefault(require("./App"));
var react_router_dom_1 = require("react-router-dom");
require("./styles/login.scss");
require("./styles/InputContainer.scss");
require("./styles/header.scss");
require("./styles/resultbar.scss");
require("./styles/split.scss");
require("./styles/diagram.scss");
require("./styles/landingpage.scss");
var rootElement = document.getElementById('root');
if (!rootElement)
    throw new Error('Failed to find the root element');
var root = (0, client_1.createRoot)(rootElement);
root.render((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(App_1.default, {}) }));
