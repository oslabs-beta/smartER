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

/*
// SUBQUERY IN FROM:
let a = {
  columns: [
    {
      expr: {
        type: 'ref',
        name: '*',
      },
    },
  ],
  from: [
    {
      type: 'table',
      name: {
        name: 'people',
        alias: 'p',
      },
    },
    {
      type: 'statement',
      statement: {
        columns: [
          {
            expr: {
              type: 'ref',
              name: '_id',
            },
          },
          {
            expr: {
              type: 'boolean',
              value: true,
            },
            alias: {
              name: 'luke',
            },
          },
        ],
        from: [
          {
            type: 'table',
            name: {
              name: 'people',
            },
          },
        ],
        where: {
          type: 'binary',
          left: {
            type: 'ref',
            name: 'name',
          },
          right: {
            type: 'string',
            value: '%Luke%',
          },
          op: 'LIKE',
        },
        type: 'select',
      },
      alias: 'luke',
      join: {
        type: 'LEFT JOIN',
        on: {
          type: 'binary',
          left: {
            type: 'ref',
            table: {
              name: 'luke',
            },
            name: '_id',
          },
          right: {
            type: 'ref',
            table: {
              name: 'p',
            },
            name: '_id',
          },
          op: '=',
        },
      },
    },
  ],
  type: 'select',
};

// SUBQUERY IN COLUMNS:
a = {
  columns: [
    {
      expr: {
        type: 'ref',
        name: 'name',
      },
    },
    {
      expr: {
        columns: [
          {
            expr: {
              type: 'ref',
              name: 'name',
            },
          },
        ],
        from: [
          {
            type: 'table',
            name: {
              name: 'people',
            },
          },
        ],
        where: {
          type: 'binary',
          left: {
            type: 'ref',
            name: 'name',
          },
          right: {
            type: 'string',
            value: '%luke%',
          },
          op: 'LIKE',
        },
        type: 'select',
      },
      alias: {
        name: 'luke',
      },
    },
  ],
  from: [
    {
      type: 'table',
      name: {
        name: 'people',
      },
    },
  ],
  type: 'select',
};

// SUBQUERY IN WHERE:
a = {
  columns: [
    {
      expr: {
        type: 'ref',
        name: '_id',
      },
    },
    {
      expr: {
        type: 'ref',
        name: 'name',
      },
    },
  ],
  from: [
    {
      type: 'table',
      name: {
        name: 'people',
      },
    },
  ],
  where: {
    type: 'binary',
    left: {
      type: 'ref',
      name: '_id',
    },
    right: {
      columns: [
        {
          expr: {
            type: 'ref',
            name: '_id',
          },
        },
      ],
      from: [
        {
          type: 'table',
          name: {
            name: 'people',
          },
        },
      ],
      where: {
        type: 'binary',
        left: {
          type: 'ref',
          name: 'name',
        },
        right: {
          type: 'string',
          value: '%Luke%',
        },
        op: 'LIKE',
      },
      type: 'select',
    },
    op: 'IN',
  },
  type: 'select',
};
*/

function conditionalSchemaParser(query: string, schema: any): returnObj {
  // errorArr contains errors that we find in the query when running mainFunc
  const errorArr: string[] = [];
  // mainObj contains a partial copy of the ER diagram with flagged columns and tables
  const mainObj: Record<string, Record<string, columnObj>> = {};
  const tableAliasLookup: Record<string, string> = {};
  let activeTables: string[];

  const ast: Statement = parseFirst(query);
  console.log('SCHEMA', schema);
  console.log('AST', ast);
  console.log('query', query);
  const queue: any[] = [];
  queue.push(ast);

  const selectHandler = (obj: any) => {
    activeTables = [];
    tableHandler(obj.from);
    columnHandler(obj.columns);

    for (let key in obj) {
      switch (key) {
        case 'from':
          break;
        case 'columns':
          break;
        case 'type':
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
            mainObj[tableName] = JSON.parse(
              JSON.stringify(schema[tableName as keyof typeof schema])
            );
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
      const type = currentColumn.expr.type;

      switch (type) {
        // Update master obj with active columns add activeColumn = true
        case 'ref':
          let specifiedTable: string | undefined;
          if (currentColumn.expr.table && currentColumn.expr.table.name) {
            specifiedTable = tableAliasLookup[currentColumn.expr.table.name];
          }
          const columnName = currentColumn.expr.name;

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
            errorArr.push(`Column ${columnName} exists in more than one table`);

        case 'string' || 'integer' || 'boolean':
          break;

        default:
        //push to the queue
      }
    }
    // if type is select, invoke selectHandler <- have not seen any columns with type select.
    // if (columnObj.type && columnObj.type === 'select') {
    //   selectHandler(columnObj)
    // }
  };

  const joinHandler = (obj: any) => {
    // const currentColumn =
    console.log('inside joinHandler');

    for (let key in obj) {
      switch (key) {
        case 'type':
          break;
        case 'on':
          for (let onKey in obj.on) {
            switch (onKey) {
              case 'type':
                break;
              case 'left' || 'right':
                const currentColumn = obj.on;
                // if left/right object has a property table with a name
                if (currentColumn[onKey].table.name) {
                  // attempt to lookup table name by alias
                  const tableName =
                    tableAliasLookup[currentColumn[onKey].table.name];
                  if (tableName) {
                    // identify col name and flag it in mainObj
                    const columnName = currentColumn[onKey].name;
                    mainObj[tableName][columnName].activeLink = true;
                  }
                } else {
                  // else iterate through mainObj and check for a table that has a column name that matches
                  const tables = Object.keys(mainObj);
                  const columnName = currentColumn[onKey].name;
                  let counter = 0;
                  for (let i = 0; i < tables.length; i++) {
                    const tableName = tables[i];
                    //keep track of matches, if no matches, add to errorArr, if >1 flag both and add to errArr that column exists in more than one table
                    if (mainObj[tableName][columnName]) {
                      mainObj[tableName][columnName].activeLink = true;
                      counter++;
                    }
                  }
                  if (counter === 0) errorArr.push('no cols found');
                  else if (counter > 1) errorArr.push('too many cols');
                }
            }
          }
        default:
        // queue.push(obj[key]);
      }
    }
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
      } else {
        for (let key in obj) {
          if (typeof obj[key] !== 'object') queue.push(obj[key]);
        }
      }
    }

    // what other keys are at top level that we need to look at?

    //   switch (key) {
    //     case 'type':
    //       switch (obj[key]) {
    //         case 'select':
    //           selectHandler(obj);
    //           break;
    //         // case 'statement':
    //         //   break;
    //         default: // This default causes an infinite loop
    //         // queue.push(obj);
    //       }
    //       break;

    //     // case 'statement':
    //     //   queue.push(obj[key]);
    //     //   break;
    //     // case 'alias':
    //     //   break;
    //     case 'join':
    //       joinHandler(obj[key]);
    //       break;
    //     // case 'where':
    //     //   // not sure this would actually happen as the where is in the select obj
    //     //   queue.push(obj[key]);
    //     //   break;
    //   }
    // }
    queue.shift();
  }

  for (const table in mainObj) connectedTablesHandler(table);
  console.log('FINAL OBJ', mainObj);
  console.log('Error Arr: ', errorArr);
  return { errorArr: errorArr, mainObj: mainObj };
}

export default conditionalSchemaParser;
