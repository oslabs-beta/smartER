import examples from './Refactor';
import { SampleData } from '../../TestData';
import {
  Statement,
  astVisitor,
  parseFirst,
  Name,
  DataTypeDef,
  ArrayDataTypeDef,
} from 'pgsql-ast-parser';

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

function mainFunc(query: string): returnObj {
  const data = SampleData; // ER Diagram
  const errorArr: string[] = [];
  const mainObj: Record<string, Record<string, columnObj>> = {};
  const tableAlias: Record<string, string> = {};

  const ast: Statement = parseFirst(query);
  console.log('AST', ast);
  console.log('query', query);
  const queue: any[] = [];
  queue.push(ast);

  const tables = new Set();
  let joins = 0;
  const visitor = astVisitor((map) => ({
    // implement here AST parts you want to hook

    tableRef: (t) => {
      tables.add(t.name);
      console.log('tableRef:', t);
    },
    join: (t) => {
      console.log('join', t);
      joins++;
      // call the default implementation of 'join'
      // this will ensure that the subtree is also traversed.
      map.super().join(t);
    },
    ref: (z) => {
      console.log('ref', z);
    },
  }));
  visitor.statement(parseFirst(query));

  const selectHandler = (obj: any) => {
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
          if (data[tableName as keyof typeof data]) {
            // Deep copy the table from data
            mainObj[tableName] = JSON.parse(
              JSON.stringify(data[tableName as keyof typeof data])
            );
            // Update alias
            if (currentTable.join) queue.push(currentTable);
            if (alias) tableAlias[alias] = tableName;
            else tableAlias[tableName] = tableName;
          } else {
            // Error to push because the table doesn't exist in our data
            errorArr.push(`Table name: ${tableName} is not found in database`);
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
            specifiedTable = tableAlias[currentColumn.expr.table.name];
          }
          const columnName = currentColumn.expr.name;

          // if tableName is specified, tables is array of tableName, else tables is array of all tables in query
          let tables: string[] = [];
          if (specifiedTable) {
            tables.push(specifiedTable);
          } else {
            tables = [...Object.keys(mainObj)];
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
                  const tableName = tableAlias[currentColumn[onKey].table.name];
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
              ...data[foreignTable as keyof typeof data],
            };

          // if foreign table is a join table, go one layer out
          // stretch: user option to toggle this feature on/off?
          if (isJoinTable(mainObj[foreignTable]))
            connectedTablesHandler(foreignTable);
        }
      }

      if (linkedTable && !mainObj[linkedTable]) {
        mainObj[linkedTable] = JSON.parse(
          JSON.stringify(data[linkedTable as keyof typeof data])
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

    for (let key in obj) {
      console.log('queue object', obj);
      switch (key) {
        case 'type':
          switch (obj[key]) {
            case 'select':
              selectHandler(obj);
              break;
            // case 'statement':
            //   break;
            default: // This default causes an infinite loop
            // queue.push(obj);
          }
          break;

        // case 'statement':
        //   queue.push(obj[key]);
        //   break;
        // case 'alias':
        //   break;
        case 'join':
          joinHandler(obj[key]);
          break;
        // case 'where':
        //   // not sure this would actually happen as the where is in the select obj
        //   queue.push(obj[key]);
        //   break;
      }
    }
    queue.shift();
  }

  for (const table in mainObj) connectedTablesHandler(table);
  console.log('FINAL OBJ', mainObj);
  return { errorArr: errorArr, mainObj: mainObj };
}

export default mainFunc;
