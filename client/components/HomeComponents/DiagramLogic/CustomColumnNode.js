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
var react_1 = require("react");
var reactflow_1 = require("reactflow");
var handleStyleLeft = {
    opacity: '0',
    marginLeft: '5px',
};
var handleStyleRight = {
    opacity: '0',
    marginRight: '5px',
};
function CustomColumnNode(_a) {
    var data = _a.data, isConnectable = _a.isConnectable;
    var onChange = (0, react_1.useCallback)(function (evt) {
        // console.log(evt.target.value);
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "column-node" }, { children: [(0, jsx_runtime_1.jsx)(reactflow_1.Handle, { type: "target", position: reactflow_1.Position.Left, isConnectable: isConnectable, style: handleStyleLeft }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "column-container" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "column-icon" }, { children: data.icon })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "column-data" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "column-name" }, { children: data.columnName })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "column-type" }, { children: data.dataType }))] }))] })), (0, jsx_runtime_1.jsx)(reactflow_1.Handle, { type: "source", position: reactflow_1.Position.Right, id: "a", style: handleStyleRight, isConnectable: isConnectable })] })));
}
exports.default = CustomColumnNode;
