import examples from './Refactor';
import { SampleData } from '../../TestData';
import { Statement, astVisitor, parseFirst } from 'pgsql-ast-parser';

type returnObj = {
  errorArr: string[];
  mainObj: typeof SampleData;
};

function mainFunc(query: string): returnObj {
  const data = SampleData; // ER Diagram
  const errorArr: string[] = [];
  const mainObj: any = {};
  const tableAlias: any = {};

  const ast: Statement = parseFirst(query);
  console.log('AST', ast);
  console.log('query', query);
  const queue: any[] = [];
  queue.push(ast);

  // select p.name from people p
  // left join species s on s._id = p.species_id

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
            mainObj[tableName] = { ...data[tableName as keyof typeof data] };
            // Update alias
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
    console.log('column handler');
    for (let i = 0; i < arr.length; i++) {
      const currentColumn = arr[i];
      console.log('current column', currentColumn);
      const type = currentColumn.expr.type;
      switch (type) {
        case 'ref':
          // Update master obj with active columns add activeColumn = true
          // if table name is accessible
          if (currentColumn.expr.table && currentColumn.expr.table.name) {
            const tableName = tableAlias[currentColumn.expr.table.name];
            const columnName = currentColumn.expr.name;
            mainObj[tableName][columnName].activeColumn = true;
            console.log('table', tableName, 'column', columnName);
          } else {
            // else iterate through mainObj and check for a table that has a column name that matches
            const tables = Object.keys(mainObj);
            const columnName = currentColumn.expr.name;
            console.log('CN: ', columnName);
            let counter = 0;
            for (let i = 0; i < tables.length; i++) {
              //keep track of matches, if no matches, add to errorArr, if >1 flag both and add to errArr that column exists in more than one table
              if (mainObj[tables[i]][columnName]) {
                mainObj[tables[i]][columnName].activeColumn = true;
                counter++;
              }
            }
            if (counter === 0)
              errorArr.push(`Column name: ${columnName} does not exist.`);
            if (counter > 1)
              errorArr.push(
                `Column name: ${columnName} exists in more than one table.`
              );
          }
        case 'string' || 'integer' || 'boolean':
          break;

        default:
        //push to the queue
      }
      // if type is select, invoke selectHandler <- have not seen any columns with type select.
      // if (columnObj.type && columnObj.type === 'select') {
      //   selectHandler(columnObj)
      // }
    }
  };

  const joinHandler = (obj: any) => {
    // const currentColumn =

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
                    //keep track of matches, if no matches, add to errorArr, if >1 flag both and add to errArr that column exists in more than one table
                    if (mainObj[tables[i]][columnName]) {
                      mainObj[tables[i]].activeLink = true;
                      counter++;
                    }
                  }
                  if (counter === 0) errorArr.push('no cols found');
                  else if (counter > 1) errorArr.push('too many cols');
                }
            }
          }
        default:
          queue.push(obj[key]);
      }
    }
  };

  while (queue.length) {
    const obj = queue[0];

    for (let key in obj) {
      switch (key) {
        case 'type':
          switch (obj[key]) {
            case 'select':
              selectHandler(obj);
              break;
            // case 'statement':
            //   break;
            default:
              queue.push(obj);
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
  console.log('end of conditional render', {
    errorArr: errorArr,
    mainObj: mainObj,
  });
  return { errorArr: errorArr, mainObj: mainObj };
}

export default mainFunc;
