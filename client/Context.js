"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageContext = void 0;
var react_1 = require("react");
var defaultHomeState = {
    submit: false,
    setSubmit: function () { },
    queryString: '',
    setQueryString: function () { },
    uri: '',
    setUri: function () { },
    savedUri: '',
    setSavedUri: function () { },
    dbCredentials: {
        host: '',
        port: 0,
        dbUsername: '',
        dbPassword: '',
        database: '',
    },
    setDBCredentials: function () { },
    queryResponse: [],
    setQueryResponse: function () { },
    masterData: {},
    setMasterData: function () { },
    renderedData: {},
    setRenderedData: function () { },
    renderedDataPositions: [],
    setRenderedDataPositions: function () { return []; },
    errorMessages: [],
    setErrorMessages: function () { return []; },
    reset: false,
    setReset: function () { },
};
exports.HomepageContext = (0, react_1.createContext)(defaultHomeState);
