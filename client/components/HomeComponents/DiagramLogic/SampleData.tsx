import { SampleData } from '../../TestData';

// let str = `
// SELECT p.*, s.name AS species,  h.name AS homeworld
// FROM people p
// LEFT JOIN species s ON p.species_id = s._id
// LEFT JOIN planets h ON p.homeworld_id = h._id`;
/**
 *
ALTER TABLE species
RENAME COLUMN eye_colors TO "eye colors"
select "eye colors" from species
select `eye colors` from species
 */

export function parseQueryAndGenerateNodes(
  queryString: string,
  data: typeof SampleData
) {
  const query = `select name, hair_color
    from people`;
  // const query = `
  // select people.name, people.hair_color,
  // s.skin_colors from people
  // left join species s on people.species_id = s._id
  // `;

  const regex = new RegExp(/"([^"]*)"|`([^`]*)`|[^\s",`]+/, 'gm');

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

  // const keywordsAfterTableName = new Set([
  const keywords = new Set([
    'left',
    'right',
    'inner',
    'outer',
    'on',
    'where',
    'join',
  ]);

  const selectOrAs = new Set(['select', 'as', 'from']);
  const tablesAndAlias: Record<string, string> = {};
  const masterObj: Record<string, typeof tableObj> = {};
  const tableObj: Record<string, columnObj> = {};
  const lowerCasedQuery = queryString.toLowerCase();
  const regexMatches = lowerCasedQuery.match(regex);
  // [ select , s._id, poopoo, from, people_, s_]

  // Not necessary, but can be used.
  const tablesToRender: Record<string, Set<string>> = {};

  // Check if there are any matches, this is null or matched array of strings
  if (regexMatches) {
    // Get all relevant Tables and aliases
    for (let i = 0; i < regexMatches.length; i++) {
      const currentString = regexMatches[i];
      const previousString = regexMatches[i - 1];
      const nextString = regexMatches[i + 1];
      // if From or Join, we know currentString is a table name
      if (previousString === 'from' || previousString === 'join') {
        // Add tables to be rendered, by making a deep copy of data, given the currentString
        tablesToRender[currentString] = new Set();
        masterObj[currentString] = {
          ...data[currentString as keyof typeof data],
        };

        // If current is pointing to a table name, the following string is either an alias or keyword.
        // If it's an alias, we add it to the tablesAndAlias object, else we add the table name as the alias
        if (!keywords.has(nextString) && nextString)
          tablesAndAlias[nextString] = currentString;
        else tablesAndAlias[currentString] = currentString;
      }
    }
    // Flag selected columns and links
    // if (Object.keys(tablesAndAlias).length < 1) return;
    let beforeFrom = true;
    console.log('REGEXMATCHES: ', regexMatches);
    /*
      select mass, average_height from people p

      left join species s on s._id = p.species_id
      select mass, diameter, name from people p

      left join planets pl on pl._id = p.homeworld_id

      select mass, diameter as "from" from people p
      left join planets pl on pl._id = p.homeworld_id

      logic for wildcards

      */
    for (let i = 0; i < regexMatches.length; i++) {
      const currentString: string = regexMatches[i];
      const previousString: string = regexMatches[i - 1];
      const splitString = currentString.split('.');
      let alias = splitString[0];
      const columnName = splitString[1];
      const tableName = tablesAndAlias[alias];
      let table: string = '';
      // If there is no alias, alias is reassigned to be the table name
      // ['name'] = ['name']['p.name'] = ['p', 'name'];
      if (splitString.length < 2) {
        //Need to refactor cause of the above queries line 91-97
        table = Object.keys(tablesAndAlias)[0];
      }
      // using alias' to select columns

      if (beforeFrom && splitString.length === 2) {
        masterObj[tableName][columnName].activeColumn = true;
        continue;
      }
      // without aliasing, using column names to select columns
      // const notSelectOrAs = new Set(['select', 'as', 'from']);

      // if we are in the SELECT list and the current word is not a column alias or a keyword
      // and current word is a column name in the
      if (
        beforeFrom &&
        !selectOrAs.has(currentString) &&
        previousString !== 'as' &&
        currentString in masterObj[table]
      ) {
        masterObj[tableName][currentString].activeColumn = true;
        continue;
      }
      // using alias' to highlight links (edges)
      if (splitString.length === 2 && !beforeFrom) {
        masterObj[tablesAndAlias[alias]][columnName].activeLink = true;
      }
      /*
      if the currentString is a *
        // mark all tables after the from statement
      if splitString has a length of 2, we know there is an alias/table name listed

      */
      `select mass, average_height from people p

      left join species s on s._id = p.species_id
      select mass, diameter, name from people p

      left join planets pl on pl._id = p.homeworld_id

      select mass, diameter as "from" from people p
      left join planets pl on pl._id = p.homeworld_id

      logic for wildcards`;
      if (currentString === '*') {
        // loop through masterObj and mark active columns for the table following from statement?
      }
      if (currentString === 'from') beforeFrom = false;
    }
  } else {
    // OPTIONAL ERROR CHECKING
  }

  // Add linked tables to masterObj and appendd to masterObj so we don't double render tables and lose active columns/links
  for (const table in masterObj) {
    for (const column in masterObj[table]) {
      const linkedTable = masterObj[table][column]['linkedTable'];
      const isForeignTable = masterObj[table][column]['foreign_tables'];
      if (isForeignTable) {
        // check if the foreign_tables is truthy
        // if so, iterate through that array to check and see if we have that table already rendered in our masterObj
        for (const foreignTable of isForeignTable) {
          if (!masterObj[foreignTable])
            masterObj[foreignTable] = {
              ...data[foreignTable as keyof typeof data],
            };
        }
        if (linkedTable && !masterObj[linkedTable]) {
          masterObj[linkedTable] = {
            ...data[linkedTable as keyof typeof data],
          };
        }
      }
    }
  }
  // Testing Logs
  // for (const key in masterObj) {
  //   for (const columns in masterObj[key]) {
  //     for (const something in masterObj[key][columns]) {
  //       console.log(something, columns, key);
  //     }
  //   }
  // }
  console.log('MASTEROBJ:', masterObj);
  return masterObj;
}

/*
    SELECT col
    FROM table
    WHERE ...

    SELECT col
    FROM table (alias)
    LEFT/RIGHT/INNER/OUTER/NOTHING JOIN table (alias) ON

    select people.name, p.hair_color, species.skin_colors from people p
    left join species on people.species_id = species._id




  select p.name from people p
  left join films f on p.film_id = f._id



  everything between SELECT and FROM is a colName
  if colName has . array = colName.split('.')
  tableAlias = array[0]
  colName = array[1]

  lookup table name in alias list, from there add cols to tables to render set

    */
// const nodes = [];

// const tablesToRender = [];
// const columnsToHighlight = {};

// for (const table of tablesToRender) {
//   const tableObject: Record<string, any> = {};
//   tableObject.table_name = table;
//   tableObject.columns = [];
//   nodes.push(tableObject);
// }

/*

    tableName1: {},
    tableName2: {},
  }
  */

// for (const table of tablesToRender) nodesObj[table] = {};
// console.log(splitBySpace);
// // find columns in each table
// if (Object.keys(tableAlias).length) {
//   for (let j = 0; j < splitBySpace.length; j++) {
//     const currEl = splitBySpace[j];
//     const prevEl = splitBySpace[j - 1];
//     if (currEl === 'FROM') break;
//     if (prevEl in tableAlias) {
//       if (currEl === '*') {
//         for (let k = 0; k < SampleData.length; k++) {
//           if (SampleData[k].table_name in nodesObj) {
//             for (let l = 0; l < SampleData[k].columns.length; l++) {
//               if (nodes[l].table_name in nodesObj)
//                 nodes[l].columns = [...SampleData[k].columns];
//               break;
//             }
//             break;
//           }
//         }
//       }
//       // currEl is the column
//     }
//   }
// } else {
//   // There are no aliases
//   let start;
//   let end;
//   let tableName: string;
//   for (let i = 0; i < splitBySpace.length; i++) {
//     const currentString = splitBySpace[i];
//     if (currentString === 'SELECT') start = i + 1;
//     if (currentString === 'FROM') {
//       end = i - 1;
//       tableName = splitBySpace[i + 1];
//     }
//   }
//   const columnsRendered = splitBySpace.slice(start, end);
//   for (let i = 0; i < columnsRendered.length; i++) {
//     // nodesObj[tableName][columnsRendered[i]] =
//     //    {
//     //     table_name: tableName,
//     //     column_name: columnsRendered[i],
//     //   },
//   }
// }

//   console.log('alias', tableAlias);
//   console.log('tables', tablesToRender);
// }
// need to get columns of interest
// get tables from our query
// external object or array
// other table information here that we want to add to our rendered tables
// combine the masterObj with the remaining tables
/**
     tablesToRender = {
    people: new Set([name])
    films: new Set()
  }

  const smallerObject = {};
  for (tableName of tablesToRender) {
    smallerObject[tableName] = mainObject[tableName] // (object contains all columns)

    for (colName of smallerObject[tableName]) {
      if (tablesToRender[tableName].has(colName) {
        smallerObject[tableName][colName].highlighted = true
      }

      if (smallerObject[colName].has(foreign_key)) {
        newTable = smallerObject[colName].linkedTable

        if (!tablesToRender.hasOwnProperty(newTable)) {
          smallerObject[newTable] = mainObject[newTable]
        }
      }
    }
  }
     */

//notes on parsing
/*

    // SELECT p.*,
    s.name AS species,
    h.name AS homeworld

    FROM people p

    LEFT JOIN species s ON p.species_id = s._id
    LEFT JOIN planets h ON p.homeworld_id = h._id

    SELECT * FROM people
    SELECT name FROM species

    //EXPECTED DIAGRAM
      //Only what's in the select statement should be black (focused)
      //Show any additional realationships that exist from people, planets, or species, but grey (to show join options)
      //People_in_films table would render, but since it's a join table, we should show films
      // ^ GO FOR THIS RIGHT AWAY

    // Query with Joins
    //Search for a JOIN first
    //Look for FROM keyword to find Table name and Alias. Store on an object. {alias: table name}
    //Look for JOIN and do the same thing ^
    //Go to SELECT to find which columns belong with which table
    //Check for aliases on columns (p.species_id)
    //Look for column names and table names, ignore aggs, groups, orders

    // Query without JOINS
*/
