import { Statement, parseFirst } from 'pgsql-ast-parser';

interface columnObj {
  table_name: string;
  column_name: string;
  data_type: string;
  primary_key?: boolean;
  foreign_key?: boolean;
  linkedTable?: string;
  linkedTableColumn?: string;
  activeColumn?: boolean;
  activeLink?: boolean;
  foreign_tables?: string[];
}
type returnObj = {
  errorArr: string[];
  mainObj: Record<string, Record<string, columnObj>>;
};
type tableAlias = {
  [key: string]: string;
};
type mainObj = {
  [key: string]: Record<string, columnObj>;
};
type key = {
  name: string;
  table: { name: string };
  type: string;
};

function conditionalSchemaParser(
  query: string,
  schema: any
): returnObj | undefined {
  try {
    // errorArr contains errors that we find in the query when running mainFunc
    const errorArr: string[] = [];
    // mainObj contains a partial copy of the ER diagram with flagged columns and tables
    const mainObj: mainObj = {};
    const tableAliasLookup: tableAlias = {};
    let activeTables: string[];
    const columnsWithUndefinedAlias: Record<string, Set<string>> = {};
    let currentSubqueryAlias: string;

    const ast: Statement = parseFirst(query);
    const queue: any[] = [];
    queue.push(ast);

    const selectHandler = (obj: any) => {
      activeTables = [];
      tableHandler(obj.from);
      columnHandler(obj.columns);

      // cleanup aliases
      if (
        currentSubqueryAlias &&
        columnsWithUndefinedAlias[currentSubqueryAlias]
      ) {
        delete columnsWithUndefinedAlias[currentSubqueryAlias];
      }
      currentSubqueryAlias = '';

      for (let key in obj) {
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

    const tableHandler = (arr: any[]) => {
      for (let i = 0; i < arr.length; i++) {
        const currentTable = arr[i];
        const type = currentTable.type;
        switch (type) {
          case 'table': {
            const tableName = currentTable.name.name;
            const alias = currentTable.name.alias;
            if (schema[tableName as keyof typeof schema]) {
              // Deep copy the table from data
              if (!mainObj[tableName]) {
                mainObj[tableName] = JSON.parse(
                  JSON.stringify(schema[tableName as keyof typeof schema])
                );
              }
              activeTables.push(tableName);
              // Update alias
              if (currentTable.join) queue.push(currentTable); // find example of this

              if (alias) tableAliasLookup[alias] = tableName;
              else tableAliasLookup[tableName] = tableName;
            } else {
              // Error to push because the table doesn't exist in our data
              errorArr.push(`Table name ${tableName} is not found in database`);
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

    const columnHandler = (arr: any[]) => {
      for (let i = 0; i < arr.length; i++) {
        const currentColumn = arr[i];
        const currentColDetails = currentColumn.expr || currentColumn;
        const type = currentColDetails.type;

        switch (type) {
          // Update master obj with active columns add activeColumn = true
          case 'ref':
            const columnName = currentColDetails.name;

            // subquery logic: if current col array is part of a subquery and the col is not referenced in the main query, skip it
            if (
              (currentSubqueryAlias &&
                !columnsWithUndefinedAlias[currentSubqueryAlias]) ||
              (columnsWithUndefinedAlias[currentSubqueryAlias] &&
                !columnsWithUndefinedAlias[currentSubqueryAlias].has(
                  columnName
                ))
            ) {
              break;
            }

            let specifiedTable: string | undefined;
            if (currentColDetails.table && currentColDetails.table.name) {
              const lookupAlias = currentColDetails.table.name;
              // console.log('table alias lookup', tableAliasLookup);
              // console.log('lookup value', lookupAlias);
              specifiedTable = tableAliasLookup[lookupAlias];

              // if no specified table is found (alias is defined in subquery)
              if (!specifiedTable) {
                // if column with alias already exists, push to key value pair
                if (columnsWithUndefinedAlias[lookupAlias]) {
                  columnsWithUndefinedAlias[lookupAlias].add(columnName);
                } else
                  columnsWithUndefinedAlias[lookupAlias] = new Set([
                    columnName,
                  ]);
                break;
              }
            }

            // if tableName is specified, tables is array of tableName, else tables is array of all tables in query
            let tables: string[] = [];
            if (specifiedTable) {
              tables.push(specifiedTable);
            } else {
              tables = [...activeTables];
            }

            let colMatchCount: number = 0;
            for (let table of tables) {
              if (columnName !== '*') {
                if (mainObj[table][columnName]) {
                  colMatchCount++;
                  mainObj[table][columnName].activeColumn = true;
                }
              } else {
                for (let column in mainObj[table]) {
                  mainObj[table][column].activeColumn = true;
                }
              }
            }

            if (colMatchCount === 0 && columnName !== '*')
              errorArr.push(`Column ${columnName} does not exist`);
            if (colMatchCount > 1)
              errorArr.push(
                `Column ${columnName} exists in more than one table`
              );
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

    const joinHandler = (obj: any) => {
      const left = obj.on.left;
      const right = obj.on.right;
      if (left) flagActiveLinks(left, tableAliasLookup, mainObj, errorArr);
      else errorArr.push(`No column found for left position of ${obj.type}`);
      if (right) flagActiveLinks(right, tableAliasLookup, mainObj, errorArr);
      else errorArr.push(`No column found for right position of ${obj.type}`);
    };

    const connectedTablesHandler = (table: string) => {
      const isJoinTable = (tableObj: any): boolean => {
        for (let column in tableObj) {
          const key =
            tableObj[column].foreign_key || tableObj[column].primary_key;
          if (!key) return false;
        }
        return true;
      };

      // for (const table in mainObj) {
      for (const column in mainObj[table]) {
        const linkedTable = mainObj[table][column].linkedTable;
        const foreignTables = mainObj[table][column].foreign_tables;

        if (foreignTables) {
          // iterate through foreign_tables array and copy any missing tables to mainObj
          for (const foreignTable of foreignTables) {
            if (!mainObj[foreignTable])
              mainObj[foreignTable] = {
                ...schema[foreignTable as keyof typeof schema],
              };

            // if foreign table is a join table, go one layer out
            // stretch: user option to toggle this feature on/off?
            if (isJoinTable(mainObj[foreignTable]))
              connectedTablesHandler(foreignTable);
          }
        }

        if (linkedTable && !mainObj[linkedTable]) {
          mainObj[linkedTable] = JSON.parse(
            JSON.stringify(schema[linkedTable as keyof typeof schema])
          );

          // if linked table is a join table, go one layer out
          if (isJoinTable(mainObj[linkedTable]))
            connectedTablesHandler(linkedTable);
        }
      }
      // }
    };

    while (queue.length) {
      const obj = queue[0];

      let type = obj.type;
      if (type) {
        type = type.toLowerCase();
        if (type === 'select') {
          selectHandler(obj);
        } else if (type.includes('join')) {
          joinHandler(obj);
        } else if (type === 'statement') {
          currentSubqueryAlias = obj.alias;
          for (let key in obj) {
            if (key.toLowerCase() !== 'where' && typeof obj[key] === 'object')
              queue.push(obj[key]);
          }
        } else {
          for (let key in obj) {
            if (key.toLowerCase() !== 'where' && typeof obj[key] === 'object')
              queue.push(obj[key]);
          }
        }
      }
      queue.shift();
    }

    for (const table in mainObj) connectedTablesHandler(table);
    return { errorArr: errorArr, mainObj: mainObj };
  } catch (error) {}
}

function flagActiveLinks(
  onKey: key,
  tableAlias: tableAlias,
  mainObj: mainObj,
  errorArr: string[]
) {
  if (onKey.table.name) {
    // attempt to lookup table name by alias
    const tableName = tableAlias[onKey.table.name];
    if (tableName) {
      // identify col name and flag it in mainObj
      const columnName = onKey.name;
      mainObj[tableName][columnName].activeLink = true;
    } // Potential error push here if tableName was not found?
  } else {
    // else iterate through mainObj and check for a table that has a column name that matches
    const tables = Object.keys(mainObj);
    const columnName = onKey.name;
    let counter = 0;
    for (let i = 0; i < tables.length; i++) {
      const tableName = tables[i];
      //keep track of matches, if no matches, add to errorArr, if >1 flag both and add to errArr that column exists in more than one table
      if (mainObj[tableName][columnName]) {
        mainObj[tableName][columnName].activeLink = true;
        counter++;
      }
      // Potential error push here if tableName/columnName was not found?
    }
    if (counter === 0) errorArr.push('no cols found');
    else if (counter > 1) errorArr.push('too many cols');
  }
}

export default conditionalSchemaParser;
