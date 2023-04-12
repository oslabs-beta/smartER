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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var Context_1 = require("../../Context");
var QueryResults = function () {
    var _a = (0, react_1.useContext)(Context_1.HomepageContext), queryResponse = _a.queryResponse, setQueryResponse = _a.setQueryResponse;
    var _b = (0, react_1.useContext)(Context_1.HomepageContext), errorMessages = _b.errorMessages, setErrorMessages = _b.setErrorMessages;
    // if data response from backend is 200 then set queryResponse to the data
    /* columnNames: [['id','name',...] */
    var columnNames = [];
    // table headers
    for (var _i = 0, queryResponse_1 = queryResponse; _i < queryResponse_1.length; _i++) {
        var row = queryResponse_1[_i];
        columnNames = Object.keys(row);
    }
    // table rows
    var columnsValue = [];
    var columnsValuesInner = [];
    // get an array of just the values from each object in the queryResponse array
    for (var i = 0; i < queryResponse.length; i++) {
        var resultsArr = Object.entries(queryResponse[i]);
        for (var _c = 0, resultsArr_1 = resultsArr; _c < resultsArr_1.length; _c++) {
            var result = resultsArr_1[_c];
            columnsValuesInner.push(result[1]);
        }
        columnsValue.push(columnsValuesInner);
        columnsValuesInner = [];
    }
    if (!errorMessages[0])
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "query-table-outer-container" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Query Results" }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "query-table-container" }, { children: (0, jsx_runtime_1.jsxs)("table", __assign({ className: "query-table" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsx)("tr", __assign({ className: "query-header" }, { children: columnNames.map(function (column) {
                                            return ((0, jsx_runtime_1.jsx)("th", __assign({ className: "query-table-cell" }, { children: column }), column));
                                        }) })) }), (0, jsx_runtime_1.jsx)("tbody", { children: columnsValue.map(function (column, index) {
                                        var columnsArray = [];
                                        column.map(function (data, i) {
                                            return columnsArray.push((0, jsx_runtime_1.jsx)("td", __assign({ className: "query-table-cell" }, { children: data }), i));
                                        });
                                        return ((0, jsx_runtime_1.jsx)("tr", __assign({ className: "query-rows" }, { children: columnsArray }), "tr".concat(index)));
                                    }) })] })) }))] })) }));
    else
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "query-table-outer-container" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Query Results" }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "query-table-container" }, { children: (0, jsx_runtime_1.jsxs)("table", __assign({ className: "query-table" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsx)("tr", { className: "query-header" }) }), (0, jsx_runtime_1.jsx)("tbody", { children: "See query error above" })] })) }))] })) }));
};
exports.default = QueryResults;
