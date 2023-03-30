/*
// prettier-ignore
{
  - master function ids type: select objects
    - select handler

    - routes to from obj handler
      - route joins to joins handler
      - pass back object containing all relevant tables with cols from ER obj
        - add join flags to colums
        - separate alias obj { alias: tableName }
      - sepearate object to track next level out?


    - use tables obj (in closure) to cols handler
      - find each col in AST obj, look for it in tables object based on
        1. alias if we have one
        2. else flag every column with the given name
        3. * if no alias, flag every column of every table, else flag every column of relevant table
    - once flagged cols passed back, add in next level out
      - think about stretch goal of multiple levels when building
    - calls itself recursively as additional nested select objects are found


  ** along the way if we find errors, push to errors array (cols that don't exist, duplicate cols,
   tables that don't exist, etc.)
}

tableHandler () {
    if (select) {
      invoke selectHandler
    } else if join {
      apply join logic / joinHandler?
    }
    else {
      apply logic
    }
  }

    3. from array
    - name.name
    - name.alias
    - join.on.left, join.on.right -> gives join col names/tables


*/
const errorArr = []
const mainObject = {}
const tableAlias = {}

function map<Input, Output>(
  array: Input[],
  callback: (element: Input) => Output
): Output[] {
  const newArray: Output[] = [];
  for (let element of array) {
    newArray.push(callback(element));
  }
  return newArray;
}

function addTablesAndGetAlias<Input>(arr: Input[]): void {
  // Iterate through the array and visit each object
  // Each object represents a table that is referenced
    // You could have subquerries.
  for (let i = 0; i < arr.length; i++) {
    const currentTable = arr[i];
    const type = currentTable.type
    switch(type) {
      case 'table': {
        if(data[currentTable.name.name]) {

        }
      }
      case 'statement': {
        selectHandler(currentTable.statement)
      }

    }

      mainObject[currentTable.name.name] = {...data[currentTable.name.name as keyof typeof data]}
    }
    if(currentTable.name.name)

    if(currentTable.join)
  }
