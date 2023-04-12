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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var Context_1 = require("../../../Context");
var Settings = function (_a) {
    var setTab = _a.setTab;
    var _b = (0, react_1.useContext)(Context_1.HomepageContext), uri = _b.uri, setUri = _b.setUri, savedUri = _b.savedUri, setSavedUri = _b.setSavedUri, dbCredentials = _b.dbCredentials, setDBCredentials = _b.setDBCredentials, masterData = _b.masterData, setMasterData = _b.setMasterData;
    //Handle submission of new URI
    var handleUriSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var encodedURI, data, parsedData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    encodedURI = encodeURIComponent(uri);
                    return [4 /*yield*/, fetch('/api/getSchema', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ uri: encodedURI }),
                        })];
                case 2:
                    data = _a.sent();
                    if (!(data.status === 200)) return [3 /*break*/, 4];
                    //TODO: add a success indicator
                    setSavedUri(encodedURI);
                    setUri('');
                    setTab('Query');
                    return [4 /*yield*/, data.json()];
                case 3:
                    parsedData = _a.sent();
                    setMasterData(parsedData);
                    return [2 /*return*/];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.log("Error in Settings.tsx ".concat(error_1));
                    return [2 /*return*/, "Error in Settings.tsx ".concat(error_1)];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    //Handle submission of new Credentials
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var encodedURI, host, port, dbUsername, dbPassword, database, hostspec, data, parsedData, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (uri) {
                        encodedURI = encodeURIComponent(uri);
                    }
                    else {
                        host = dbCredentials.host, port = dbCredentials.port, dbUsername = dbCredentials.dbUsername, dbPassword = dbCredentials.dbPassword, database = dbCredentials.database;
                        hostspec = port ? "".concat(host, ":").concat(port) : host;
                        encodedURI = encodeURIComponent("postgres://".concat(dbUsername, ":").concat(dbPassword, "@").concat(hostspec, "/").concat(database));
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch('/api/getSchema', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ uri: encodedURI }),
                        })];
                case 2:
                    data = _a.sent();
                    if (!(data.status === 200)) return [3 /*break*/, 4];
                    //TODO: add a success indicator
                    setSavedUri(encodedURI);
                    setUri('');
                    setDBCredentials({
                        host: '',
                        port: 0,
                        dbUsername: '',
                        dbPassword: '',
                        database: '',
                    });
                    setTab('Query');
                    return [4 /*yield*/, data.json()];
                case 3:
                    parsedData = _a.sent();
                    setMasterData(parsedData);
                    return [2 /*return*/];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.log('Error in Settings.tsx handleSubmit');
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "settings-main" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "uri-main" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "settings-title" }, { children: "URI" })), (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsx)("label", __assign({ htmlFor: "uri" }, { children: (0, jsx_runtime_1.jsx)("input", { id: "uri", className: "settings-input", type: "password", required: true, onChange: function (e) { return setUri(e.target.value); }, value: uri }) })), (0, jsx_runtime_1.jsx)("h2", __assign({ className: "settings-title" }, { children: "Credentials" })), (0, jsx_runtime_1.jsx)("label", __assign({ htmlFor: "host" }, { children: "Host" })), (0, jsx_runtime_1.jsx)("input", { id: "Host", className: "settings-input", type: "text", required: true, onChange: function (e) {
                                return setDBCredentials(function (prevState) {
                                    return __assign(__assign({}, prevState), { host: e.target.value });
                                });
                            }, value: dbCredentials.host }), (0, jsx_runtime_1.jsx)("label", __assign({ htmlFor: "port" }, { children: "Port" })), (0, jsx_runtime_1.jsx)("input", { id: "port", className: "settings-input", type: "number", required: true, onChange: function (e) {
                                return setDBCredentials(function (prevState) {
                                    return __assign(__assign({}, prevState), { port: e.target.value });
                                });
                            }, value: dbCredentials.port }), (0, jsx_runtime_1.jsx)("label", __assign({ htmlFor: "username" }, { children: "Username" })), (0, jsx_runtime_1.jsx)("input", { id: "username", className: "settings-input", type: "text", required: true, onChange: function (e) {
                                return setDBCredentials(function (prevState) {
                                    return __assign(__assign({}, prevState), { dbUsername: e.target.value });
                                });
                            }, value: dbCredentials.dbUsername }), (0, jsx_runtime_1.jsx)("label", __assign({ htmlFor: "password" }, { children: "Password" })), (0, jsx_runtime_1.jsx)("input", { id: "password", className: "settings-input", type: "password", required: true, onChange: function (e) {
                                return setDBCredentials(function (prevState) {
                                    return __assign(__assign({}, prevState), { dbPassword: e.target.value });
                                });
                            }, value: dbCredentials.dbPassword }), (0, jsx_runtime_1.jsx)("label", __assign({ htmlFor: "database" }, { children: "Database" })), (0, jsx_runtime_1.jsx)("input", { id: "database", className: "settings-input", type: "text", required: true, onChange: function (e) {
                                return setDBCredentials(function (prevState) {
                                    return __assign(__assign({}, prevState), { database: e.target.value });
                                });
                            }, value: dbCredentials.database }), (0, jsx_runtime_1.jsx)("button", __assign({ type: "submit", className: "submit-settings", onClick: handleSubmit }, { children: "connect" }))] })] })) })));
};
exports.default = Settings;
