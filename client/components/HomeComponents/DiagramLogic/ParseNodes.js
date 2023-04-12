"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEdges = exports.parseNodes = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var ionicons_1 = __importDefault(require("@reacticons/ionicons"));
function parseNodes(rawData) {
    var standardHeight = 25;
    // const pkey = <FontAwesomeIcon icon={p_key} />;
    var pkey = (0, jsx_runtime_1.jsx)(ionicons_1.default, { id: "pkey", name: "key" });
    var fkey = (0, jsx_runtime_1.jsx)(ionicons_1.default, { id: "fkey", name: "key-outline" });
    var nodes = [];
    var j = 0;
    for (var table in rawData) {
        // create GROUPS
        var newContainer = {
            id: "".concat(table, ".group"),
            type: 'group',
            // position: { x: 200 * j, y: Math.random() * 100 }, //Control spacing of tables here, Probably needs an algo
            data: { label: table },
            style: {
                height: Object.keys(rawData[table]).length * standardHeight +
                    standardHeight +
                    0,
                width: 180,
                display: 'flex',
                opacity: 0.25,
                zIndex: 10,
            },
            draggable: true,
        };
        j++;
        nodes.push(newContainer);
        // create table name node
        var newColumnTitle = {
            id: "".concat(table, ".columnName"),
            type: 'CustomTitleNode',
            parentNode: "".concat(table, ".group"),
            extent: 'default',
            position: { x: 0, y: 0 + 0 },
            data: { label: table },
            sourcePosition: 'bottom',
            targetPosition: 'bottom',
            style: {
                background: '#1E3D59',
                color: 'F5F0E1',
                borderRadius: '5px',
                opacity: 1,
                transition: 'opacity 250ms ease-in',
                width: 180,
                height: standardHeight,
            },
            draggable: false,
        };
        nodes.push(newColumnTitle);
        //create Column nodes
        var i = 0;
        for (var columnObj in rawData[table]) {
            var column = rawData[table][columnObj];
            var newColumnNode = {
                id: "".concat(columnObj, ".").concat(table, ".node"),
                type: 'CustomColumnNode',
                parentNode: "".concat(table, ".group"),
                extent: 'parent',
                position: {
                    x: 0,
                    y: i === 0 ? standardHeight : i * standardHeight + standardHeight,
                },
                data: {
                    label: "".concat(columnObj, " | ").concat(column.data_type),
                    icon: (0, jsx_runtime_1.jsx)("div", { children: "\u2003" }),
                    columnName: columnObj,
                    dataType: column.data_type,
                },
                sourcePosition: 'right',
                targetPosition: 'left',
                draggable: false,
                style: {
                    background: 'transparent',
                    borderRadius: '',
                    opacity: 1,
                    transition: 'opacity 250ms ease-in',
                    width: 180,
                    height: standardHeight,
                },
            };
            if (column.primary_key) {
                newColumnNode.data.icon = pkey;
                newColumnNode.data.columnName = "".concat(columnObj);
                newColumnNode.data.dataType = "".concat(column.data_type);
            }
            if (column.foreign_key) {
                newColumnNode.data.icon = fkey;
                newColumnNode.data.columnName = "".concat(columnObj);
                newColumnNode.data.dataType = "".concat(column.data_type);
            }
            //check if active column
            if (column.activeColumn) {
                newColumnNode.style = {
                    background: '#FFC13B',
                    borderRadius: '5px',
                    width: 180,
                    opacity: 1,
                    transition: 'opacity 250ms ease-in',
                    height: standardHeight,
                };
            }
            else {
                newColumnNode.style = {
                    background: '#6B7B8C',
                    borderRadius: '5px',
                    width: 180,
                    opacity: 1,
                    transition: 'opacity 250ms ease-in',
                    height: standardHeight,
                };
            }
            nodes.push(newColumnNode);
            i++;
        }
    }
    return nodes;
}
exports.parseNodes = parseNodes;
function parseEdges(data) {
    var edges = [];
    for (var table in data) {
        for (var columnObj in data[table]) {
            var columnName = data[table][columnObj].column_name;
            var column = data[table][columnObj];
            if (column.foreign_key) {
                var newEdge = {
                    id: "".concat(table, ".").concat(columnName, "->").concat(column.linkedTableColumn, ".").concat(column.column_name),
                    source: "".concat(columnName, ".").concat(table, ".node"),
                    target: "".concat(column.linkedTableColumn, ".").concat(column.linkedTable, ".node"),
                    type: 'default',
                    style: {},
                    animated: false,
                };
                if (column.activeLink) {
                    newEdge.animated = false;
                    newEdge.style = {
                        stroke: 'white',
                        strokeWidth: '5',
                    };
                }
                else {
                    newEdge.animated = false;
                    newEdge.style = {
                        strokeWidth: '3',
                        stroke: 'grey',
                        strokeDasharray: '5,5',
                    };
                }
                // check if active connection
                edges.push(newEdge);
            }
        }
    }
    return edges;
}
exports.parseEdges = parseEdges;
