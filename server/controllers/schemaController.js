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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//
var schemaController = {
    connectDb: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var uri, decodedUri, envCredentials;
        return __generator(this, function (_a) {
            try {
                console.log('running connectDb');
                uri = req.body.uri;
                decodedUri = decodeURIComponent(uri);
                envCredentials = { connectionString: decodedUri };
                res.locals.pg = new pg_1.Pool(envCredentials);
                return [2 /*return*/, next()];
            }
            catch (error) {
                return [2 /*return*/, next({
                        log: "Error in schemaController.connectDb ".concat(error),
                        status: 400,
                        message: { error: error },
                    })];
            }
            return [2 /*return*/];
        });
    }); },
    getSchemaPostgreSQL: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var pg, currentSchemaSQL, currentSchema, constraintArr, query, schema, erDiagram, tableObj, i, nextTableName, current, constraintObj, _i, constraintArr_1, constraint, relationship, string, tableName, columnName, tableOrigin, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    pg = res.locals.pg;
                    return [4 /*yield*/, pg.query("SELECT current_schema FROM current_schema")];
                case 1:
                    currentSchemaSQL = _a.sent();
                    currentSchema = currentSchemaSQL.rows[0].current_schema;
                    constraintArr = [];
                    query = "SELECT * FROM (\n        SELECT DISTINCT ON (c.table_name, c.column_name)\n            c.table_name,\n            c.column_name,\n            c.data_type,\n            c. ordinal_position,\n            max(case when tc.constraint_type = 'PRIMARY KEY' then 1 else 0 end) OVER(PARTITION BY c.table_name, c.column_name) AS is_primary_key,\n            cc.table_name as table_origin,\n            cc.column_name as table_column\n\n        FROM information_schema.key_column_usage kc\n\n        INNER JOIN information_schema.table_constraints tc\n        ON kc.table_name = tc.table_name AND kc.table_schema = tc.table_schema AND kc.constraint_name = tc.constraint_name\n\n        LEFT JOIN information_schema.constraint_column_usage cc\n        ON cc.constraint_name = kc.constraint_name AND tc.constraint_type = 'FOREIGN KEY'\n\n        RIGHT JOIN information_schema.columns c\n        ON c.table_name = kc.table_name AND c.column_name = kc.column_name\n\n        WHERE c.table_schema = '".concat(currentSchema, "' AND is_updatable = 'YES'\n\n        ORDER BY c.table_name, c.column_name, is_primary_key desc, table_origin) subquery\n\n      ORDER BY table_name, ordinal_position;");
                    return [4 /*yield*/, pg.query(query)];
                case 2:
                    schema = _a.sent();
                    erDiagram = {};
                    tableObj = {};
                    // Make custom type for any on tableObj
                    // Iterate through array of all table names, columns, and data types
                    for (i = 0; i < schema.rows.length; i++) {
                        nextTableName = void 0;
                        if (schema.rows[i + 1])
                            nextTableName = schema.rows[i + 1].table_name;
                        current = schema.rows[i];
                        //column object type and declaration
                        // Assign table name and column name
                        tableObj[current.column_name] = {};
                        tableObj[current.column_name].table_name = current.table_name;
                        tableObj[current.column_name].column_name = current.column_name;
                        // Assign data type
                        if (current.data_type === 'integer')
                            tableObj[current.column_name].data_type = 'int';
                        else if (current.data_type === 'character varying')
                            tableObj[current.column_name].data_type = 'varchar';
                        else
                            tableObj[current.column_name].data_type = current.data_type;
                        // Add relationships and constraints if there are any
                        if (current.is_primary_key) {
                            tableObj[current.column_name].primary_key = true;
                            tableObj[current.column_name].foreign_tables = [];
                        }
                        // table_origin is only given when column is a foreign key
                        if (current.table_origin) {
                            constraintObj = {};
                            constraintObj["".concat([current.table_origin], ".").concat(current.table_column)] =
                                current.table_name;
                            tableObj[current.column_name].foreign_key = true;
                            tableObj[current.column_name].linkedTable = current.table_origin;
                            tableObj[current.column_name].linkedTableColumn =
                                current.table_column;
                            constraintArr.push(__assign({}, constraintObj));
                        }
                        // if table name at next row is a different table,
                        // push a deep copy of the tableObj to final ER diagram and reset tableObj
                        if (!nextTableName || nextTableName !== current.table_name) {
                            erDiagram[current.table_name] = __assign({}, tableObj);
                            tableObj = {};
                        }
                    }
                    for (_i = 0, constraintArr_1 = constraintArr; _i < constraintArr_1.length; _i++) {
                        constraint = constraintArr_1[_i];
                        for (relationship in constraint) {
                            string = relationship.split('.');
                            tableName = string[0];
                            columnName = string[1];
                            tableOrigin = constraint[relationship];
                            erDiagram[tableName][columnName].foreign_tables.push(tableOrigin);
                        }
                    }
                    res.locals.erDiagram = erDiagram;
                    return [2 /*return*/, next()];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, next({
                            log: "Error in schemaController.getSchemaPostgreSQL ".concat(error_1),
                            status: 400,
                            message: { error: error_1 },
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    getQueryResults: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var queryString, pg, getQuery, results, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    queryString = req.body.queryString;
                    pg = res.locals.pg;
                    return [4 /*yield*/, pg.query(queryString)];
                case 1:
                    getQuery = _a.sent();
                    results = getQuery.rows;
                    res.locals.queryResults = results;
                    return [2 /*return*/, next()];
                case 2:
                    error_2 = _a.sent();
                    return [2 /*return*/, next({
                            log: "Error in schemaController.getQueryResults ".concat(error_2),
                            status: 400,
                            message: { error: error_2 },
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); },
};
exports.default = schemaController;
