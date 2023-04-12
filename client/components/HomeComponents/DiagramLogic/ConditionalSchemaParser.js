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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var pgsql_ast_parser_1 = require("pgsql-ast-parser");
function conditionalSchemaParser(query, schema) {
    // errorArr contains errors that we find in the query when running mainFunc
    var errorArr = [];
    // mainObj contains a partial copy of the ER diagram with flagged columns and tables
    var mainObj = {};
    var tableAliasLookup = {};
    var activeTables;
    var columnsWithUndefinedAlias = {};
    var currentSubqueryAlias;
    var ast = (0, pgsql_ast_parser_1.parseFirst)(query);
    var queue = [];
    queue.push(ast);
    var selectHandler = function (obj) {
        activeTables = [];
        tableHandler(obj.from);
        columnHandler(obj.columns);
        // cleanup aliases
        if (currentSubqueryAlias &&
            columnsWithUndefinedAlias[currentSubqueryAlias]) {
            delete columnsWithUndefinedAlias[currentSubqueryAlias];
        }
        currentSubqueryAlias = '';
        for (var key in obj) {
            switch (key) {
                case 'from':
                    break;
                case 'columns':
                    break;
                case 'type':
                    break;
                case 'where':
                    break;
                default:
                    queue.push(obj[key]);
            }
        }
    };
    var tableHandler = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var currentTable = arr[i];
            var type = currentTable.type;
            switch (type) {
                case 'table': {
                    var tableName = currentTable.name.name;
                    var alias = currentTable.name.alias;
                    if (schema[tableName]) {
                        // Deep copy the table from data
                        if (!mainObj[tableName]) {
                            mainObj[tableName] = JSON.parse(JSON.stringify(schema[tableName]));
                        }
                        activeTables.push(tableName);
                        // Update alias
                        if (currentTable.join)
                            queue.push(currentTable); // find example of this
                        if (alias)
                            tableAliasLookup[alias] = tableName;
                        else
                            tableAliasLookup[tableName] = tableName;
                    }
                    else {
                        // Error to push because the table doesn't exist in our data
                        errorArr.push("Table name ".concat(tableName, " is not found in database"));
                    }
                    break;
                }
                default: {
                    queue.push(currentTable);
                    break;
                }
            }
        }
    };
    var columnHandler = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var currentColumn = arr[i];
            var currentColDetails = currentColumn.expr || currentColumn;
            var type = currentColDetails.type;
            switch (type) {
                // Update master obj with active columns add activeColumn = true
                case 'ref':
                    var columnName = currentColDetails.name;
                    // subquery logic: if current col array is part of a subquery and the col is not referenced in the main query, skip it
                    if ((currentSubqueryAlias &&
                        !columnsWithUndefinedAlias[currentSubqueryAlias]) ||
                        (columnsWithUndefinedAlias[currentSubqueryAlias] &&
                            !columnsWithUndefinedAlias[currentSubqueryAlias].has(columnName))) {
                        break;
                    }
                    var specifiedTable = void 0;
                    if (currentColDetails.table && currentColDetails.table.name) {
                        var lookupAlias = currentColDetails.table.name;
                        // console.log('table alias lookup', tableAliasLookup);
                        // console.log('lookup value', lookupAlias);
                        specifiedTable = tableAliasLookup[lookupAlias];
                        // if no specified table is found (alias is defined in subquery)
                        if (!specifiedTable) {
                            // if column with alias already exists, push to key value pair
                            if (columnsWithUndefinedAlias[lookupAlias]) {
                                columnsWithUndefinedAlias[lookupAlias].add(columnName);
                            }
                            else
                                columnsWithUndefinedAlias[lookupAlias] = new Set([columnName]);
                            break;
                        }
                    }
                    // if tableName is specified, tables is array of tableName, else tables is array of all tables in query
                    var tables = [];
                    if (specifiedTable) {
                        tables.push(specifiedTable);
                    }
                    else {
                        tables = __spreadArray([], activeTables, true);
                    }
                    var colMatchCount = 0;
                    for (var _i = 0, tables_1 = tables; _i < tables_1.length; _i++) {
                        var table = tables_1[_i];
                        if (columnName !== '*') {
                            if (mainObj[table][columnName]) {
                                colMatchCount++;
                                mainObj[table][columnName].activeColumn = true;
                            }
                        }
                        else {
                            for (var column in mainObj[table]) {
                                mainObj[table][column].activeColumn = true;
                            }
                        }
                    }
                    if (colMatchCount === 0 && columnName !== '*')
                        errorArr.push("Column ".concat(columnName, " does not exist"));
                    if (colMatchCount > 1)
                        errorArr.push("Column ".concat(columnName, " exists in more than one table"));
                    break;
                case 'call':
                    columnHandler(currentColDetails.args);
                    break;
                default:
                    queue.push(currentColDetails);
            }
        }
        // if type is select, invoke selectHandler <- have not seen any columns with type select.
        // if (columnObj.type && columnObj.type === 'select') {
        //   selectHandler(columnObj)
        // }
    };
    var joinHandler = function (obj) {
        var left = obj.on.left;
        var right = obj.on.right;
        if (left)
            flagActiveLinks(left, tableAliasLookup, mainObj, errorArr);
        else
            errorArr.push("No column found for left position of ".concat(obj.type));
        if (right)
            flagActiveLinks(right, tableAliasLookup, mainObj, errorArr);
        else
            errorArr.push("No column found for right position of ".concat(obj.type));
    };
    var connectedTablesHandler = function (table) {
        var isJoinTable = function (tableObj) {
            for (var column in tableObj) {
                var key = tableObj[column].foreign_key || tableObj[column].primary_key;
                if (!key)
                    return false;
            }
            return true;
        };
        // for (const table in mainObj) {
        for (var column in mainObj[table]) {
            var linkedTable = mainObj[table][column].linkedTable;
            var foreignTables = mainObj[table][column].foreign_tables;
            if (foreignTables) {
                // iterate through foreign_tables array and copy any missing tables to mainObj
                for (var _i = 0, foreignTables_1 = foreignTables; _i < foreignTables_1.length; _i++) {
                    var foreignTable = foreignTables_1[_i];
                    if (!mainObj[foreignTable])
                        mainObj[foreignTable] = __assign({}, schema[foreignTable]);
                    // if foreign table is a join table, go one layer out
                    // stretch: user option to toggle this feature on/off?
                    if (isJoinTable(mainObj[foreignTable]))
                        connectedTablesHandler(foreignTable);
                }
            }
            if (linkedTable && !mainObj[linkedTable]) {
                mainObj[linkedTable] = JSON.parse(JSON.stringify(schema[linkedTable]));
                // if linked table is a join table, go one layer out
                if (isJoinTable(mainObj[linkedTable]))
                    connectedTablesHandler(linkedTable);
            }
        }
        // }
    };
    while (queue.length) {
        var obj = queue[0];
        var type = obj.type;
        if (type) {
            type = type.toLowerCase();
            if (type === 'select') {
                selectHandler(obj);
            }
            else if (type.includes('join')) {
                joinHandler(obj);
            }
            else if (type === 'statement') {
                currentSubqueryAlias = obj.alias;
                for (var key in obj) {
                    if (key.toLowerCase() !== 'where' && typeof obj[key] === 'object')
                        queue.push(obj[key]);
                }
            }
            else {
                for (var key in obj) {
                    if (key.toLowerCase() !== 'where' && typeof obj[key] === 'object')
                        queue.push(obj[key]);
                }
            }
        }
        queue.shift();
    }
    for (var table in mainObj)
        connectedTablesHandler(table);
    return { errorArr: errorArr, mainObj: mainObj };
}
function flagActiveLinks(onKey, tableAlias, mainObj, errorArr) {
    if (onKey.table.name) {
        // attempt to lookup table name by alias
        var tableName = tableAlias[onKey.table.name];
        if (tableName) {
            // identify col name and flag it in mainObj
            var columnName = onKey.name;
            mainObj[tableName][columnName].activeLink = true;
        } // Potential error push here if tableName was not found?
    }
    else {
        // else iterate through mainObj and check for a table that has a column name that matches
        var tables = Object.keys(mainObj);
        var columnName = onKey.name;
        var counter = 0;
        for (var i = 0; i < tables.length; i++) {
            var tableName = tables[i];
            //keep track of matches, if no matches, add to errorArr, if >1 flag both and add to errArr that column exists in more than one table
            if (mainObj[tableName][columnName]) {
                mainObj[tableName][columnName].activeLink = true;
                counter++;
            }
            // Potential error push here if tableName/columnName was not found?
        }
        if (counter === 0)
            errorArr.push('no cols found');
        else if (counter > 1)
            errorArr.push('too many cols');
    }
}
exports.default = conditionalSchemaParser;
