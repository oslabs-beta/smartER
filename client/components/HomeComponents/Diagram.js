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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var reactflow_1 = __importStar(require("reactflow"));
require("reactflow/dist/style.css");
var Context_1 = require("../../Context");
var ParseNodes_1 = require("./DiagramLogic/ParseNodes");
var CustomColumnNode_1 = __importDefault(require("./DiagramLogic/CustomColumnNode"));
var CustomTitleNode_1 = __importDefault(require("./DiagramLogic/CustomTitleNode"));
var ConditionalSchemaParser_1 = __importDefault(require("./DiagramLogic/ConditionalSchemaParser"));
var LayoutCalc_1 = require("./DiagramLogic/LayoutCalc");
var proOptions = { hideAttribution: true };
var nodeTypes = {
    CustomColumnNode: CustomColumnNode_1.default,
    CustomTitleNode: CustomTitleNode_1.default,
};
var fitViewOptions = {
    padding: 10,
};
var Diagram = function () {
    // STATE
    var _a = (0, reactflow_1.useNodesState)([]), nodes = _a[0], setNodes = _a[1], onNodesChange = _a[2];
    var _b = (0, reactflow_1.useEdgesState)([]), edges = _b[0], setEdges = _b[1], onEdgesChange = _b[2];
    var _c = (0, react_1.useContext)(Context_1.HomepageContext), queryString = _c.queryString, savedUri = _c.savedUri, submit = _c.submit, masterData = _c.masterData, setMasterData = _c.setMasterData, renderedData = _c.renderedData, setRenderedData = _c.setRenderedData, renderedDataPositions = _c.renderedDataPositions, setRenderedDataPositions = _c.setRenderedDataPositions, errorMessages = _c.errorMessages, setErrorMessages = _c.setErrorMessages, queryResponse = _c.queryResponse, setQueryResponse = _c.setQueryResponse, reset = _c.reset, setReset = _c.setReset;
    function getQueryResults() {
        return __awaiter(this, void 0, void 0, function () {
            var data, parsedData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, fetch('/api/getQueryResults', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ queryString: queryString, uri: savedUri }),
                            })];
                    case 1:
                        data = _a.sent();
                        if (!(data.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        parsedData = _a.sent();
                        //setState query result for rendering QueryResults.tsx
                        setQueryResponse(parsedData);
                        return [3 /*break*/, 3];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log("Error in QueryInput.tsx ".concat(error_1));
                        return [2 /*return*/, "Error in QueryInput.tsx ".concat(error_1)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    // HOOKS
    var onConnect = (0, react_1.useCallback)(function (params) { return setEdges(function (eds) { return (0, reactflow_1.addEdge)(params, eds); }); }, [setEdges]);
    var onNodeDragStop = function (e, node) {
        // console.log(e, node);
        setRenderedDataPositions(__spreadArray(__spreadArray([], renderedDataPositions, true), [node], false));
    };
    (0, react_1.useEffect)(function () {
        setNodes([]);
        setEdges([]);
    }, [reset]);
    // when submit value changes, parse query to conditionally render ER diagram and if no errors are found in the logic,
    // invoke getQueryResults function to render query results
    (0, react_1.useEffect)(function () {
        if (queryString) {
            (function () { return __awaiter(void 0, void 0, void 0, function () {
                var queryParse, errorArr, defaultNodes, defaultEdges, positions, currentTables, newTables, combinedLength, testElk;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            setErrorMessages(['']);
                            queryParse = (0, ConditionalSchemaParser_1.default)(queryString, masterData);
                            errorArr = queryParse.errorArr;
                            setErrorMessages(errorArr);
                            if (!errorArr[0])
                                getQueryResults();
                            defaultNodes = (0, ParseNodes_1.parseNodes)(queryParse.mainObj);
                            defaultEdges = (0, ParseNodes_1.parseEdges)(queryParse.mainObj);
                            positions = [];
                            currentTables = Object.keys(renderedData);
                            newTables = Object.keys(queryParse.mainObj);
                            combinedLength = new Set(currentTables.concat(newTables)).size;
                            if (currentTables.length === newTables.length &&
                                currentTables.length === combinedLength) {
                                positions = renderedDataPositions;
                            }
                            return [4 /*yield*/, (0, LayoutCalc_1.getElkData)(defaultNodes, defaultEdges, positions)];
                        case 1:
                            testElk = _a.sent();
                            setNodes(testElk);
                            setRenderedDataPositions(testElk);
                            setEdges(defaultEdges);
                            setRenderedData(queryParse.mainObj);
                            return [2 /*return*/];
                    }
                });
            }); })();
        }
    }, [submit]);
    return ((0, jsx_runtime_1.jsx)(reactflow_1.ReactFlowProvider, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "diagram-box" }, { children: (0, jsx_runtime_1.jsxs)(reactflow_1.default, __assign({ nodes: nodes, edges: edges, onNodesChange: onNodesChange, onEdgesChange: onEdgesChange, onNodeDragStop: onNodeDragStop, onConnect: onConnect, fitView: true, proOptions: proOptions, nodeTypes: nodeTypes }, { children: [(0, jsx_runtime_1.jsx)(reactflow_1.Controls, {}), (0, jsx_runtime_1.jsx)(reactflow_1.Background, { gap: 12, size: 1 })] })) })) }));
};
exports.default = Diagram;
