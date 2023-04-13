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
var Context_1 = require("../../../Context");
var lodash_1 = require("lodash");
var QueryInput = function () {
    var _a = (0, react_1.useContext)(Context_1.HomepageContext), savedUri = _a.savedUri, queryString = _a.queryString, setQueryString = _a.setQueryString, errorMessages = _a.errorMessages, setErrorMessages = _a.setErrorMessages, submit = _a.submit, setSubmit = _a.setSubmit, queryResponse = _a.queryResponse, setQueryResponse = _a.setQueryResponse, reset = _a.reset, setReset = _a.setReset;
    var errorList = function () {
        // if the query is not valid, errorMessage will be returned
        if (errorMessages.length > 0) {
            var ErrorMessage = errorMessages.map(function (err, i) {
                return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "error-table-cell error-message" }, { children: "\u26A0 ".concat(err) }), "".concat(i, "-errorCell")));
            });
            return ErrorMessage;
        }
    };
    var err = errorList();
    // Handle submit of queryString
    var handleSubmit = function (e) {
        e.preventDefault();
        //setSubmit to trigger useEffect for re-rendering Diagram.tsx and getting query results
        setSubmit(!submit);
    };
    var checkPause;
    var handleTyping = function (e) {
        try {
            setQueryString(e.target.value);
            var lastChar = e.target.value[e.target.value.length - 1];
            var keys = new Set([' ', ',', ';', 'Tab', 'Return']);
            var lowerCaseQuery = e.target.value.toLowerCase();
            if (keys.has(lastChar) &&
                lowerCaseQuery.includes('select') &&
                lowerCaseQuery.includes('from')) {
                setSubmit(!submit);
                errorList();
                // do not check for pause if the last character entered was in the list of keys
            }
        }
        catch (error) {
            console.log('Error in handleTyping: ', error);
        }
    };
    var handlePause = (0, lodash_1.debounce)(function () {
        // only run if handleTyping functionality did not just run
        var lowerCaseQuery = queryString.toLowerCase();
        if (lowerCaseQuery.includes('select') && lowerCaseQuery.includes('from')) {
            setSubmit(!submit);
        }
    }, 500);
    // handling tab key
    var handleKeys = function (e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            var start = e.target.selectionStart;
            var end = e.target.selectionEnd;
            e.target.value = "".concat(e.target.value.substring(0, start), "\t").concat(e.target.value.substring(end));
            e.target.selectionStart = e.target.selectionEnd = start + 1;
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "query-main" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "query-main-inner" }, { children: [(0, jsx_runtime_1.jsx)("textarea", { className: "query-input", required: true, placeholder: "type your query", onChange: handleTyping, value: queryString, onKeyUp: handlePause, onKeyDown: handleKeys }), (0, jsx_runtime_1.jsx)("button", __assign({ className: "clear-button", onClick: function () {
                            setQueryResponse([]);
                            setQueryString('');
                            setReset(!reset);
                        } }, { children: "clear" })), (0, jsx_runtime_1.jsx)("button", __assign({ type: "submit", className: "submit-query-button", onClick: handleSubmit }, { children: "run" }))] })), errorMessages[0] && (0, jsx_runtime_1.jsx)("div", __assign({ className: "error-message-container" }, { children: err }))] })));
};
exports.default = QueryInput;
