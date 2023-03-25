import {table} from 'console';
import {query} from 'express';
import {SampleData} from '../../TestData';

let str = `
SELECT p.*, s.name AS species,  h.name AS homeworld
FROM people p
LEFT JOIN species s ON p.species_id = s._id
LEFT JOIN planets h ON p.homeworld_id = h._id`;
/**
 *
ALTER TABLE species
RENAME COLUMN eye_colors TO "eye colors"
select "eye colors" from species
select `eye colors` from species
 */
function parseQueryAndGenerateNodes(
  queryString: string,
  data: typeof SampleData
) {
  {
    // Determine tables to render
    // Determine Aliases
    // after FROM
    // after JOIN
    // console.log(queryString);
    /*
    SELECT col
    FROM table
    WHERE ...

    SELECT col
    FROM table (alias)
    LEFT/RIGHT/INNER/OUTER/NOTHING JOIN table (alias) ON

    select people.name, p.hair_color, species.skin_colors from people p
    left join species on people.species_id = species._id


    main object:
    {
      films: [
  `    {
        table_name: 'films',
        column_name: '_id',
        data_type: 'int',
      },
      {
        table_name: 'films',
        column_name: 'title',
        data_type: 'varchar',
      },
      {
        table_name: 'films',
        column_name: 'episode_id',
        data_type: 'int',
      },
    ],
    {
      people:{
        someColumnName: {
          EVERY DATA WE NEED
        }
      }
      films:{}
    }
    people:
      {
        _id: {
          table_name: 'people',
          column_name: '_id',
          data_type: 'int',
        }
      }
    ,
      {
        table_name: 'people',
        column_name: 'name',
        data_type: 'varchar',
      },
      {
        table_name: 'people',
        column_name: 'mass',
        data_type: 'varchar',
      },
      {
        table_name: 'people',
        column_name: 'film_id',
        data_type: 'bigint',
        foreign_key: true,
        linkedTable: 'films',
        linkedTableColumn: '_id',
      },
      {
        table_name: 'people',
        column_name: 'homeworld_id',
        data_type: 'bigint',
        foreign_key: true,
        linkedTable: 'planets',
        linkedTableColumn: '_id',
      },
      {
        table_name: 'people',
        column_name: 'height',
        data_type: 'int',
      },
    ],
  },`

  select p.name from people p
  left join films f on p.film_id = f._id

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

  everything between SELECT and FROM is a colName
  if colName has . array = colName.split('.')
  tableAlias = array[0]
  colName = array[1]

  lookup table name in alias list, from there add cols to tables to render set

    */
    const nodes = [];
    const keywords = new Set([
      'LEFT',
      'RIGHT',
      'INNER',
      'OUTER',
      'ON',
      'WHERE',
      'JOIN',
    ]);
    const tablesToRender = [];
    const columnsToHighlight = {};
    const tableAlias: Record<string, string> = {};
    const re = new RegExp(
      /(?<=")([^"]*)(?=")|(?<=`)([^`]*)(?=`)|[^\s"`]+/,
      'gm'
    );
    console.log(re);
    const splitBySpace = queryString.split(re);

    for (let i = 0; i < splitBySpace.length; i++) {
      const currentString = splitBySpace[i];
      const previousString = splitBySpace[i - 1];
      const nextString = splitBySpace[i + 1];
      if (previousString === 'FROM' || previousString === 'JOIN') {
        tablesToRender.push(currentString);
        if (!keywords.has(nextString)) tableAlias[nextString] = currentString;
        else tableAlias[currentString] = currentString;
      }
    }

    for (const table of tablesToRender) {
      const tableObject: Record<string, any> = {};
      tableObject.table_name = table;
      tableObject.columns = [];
      nodes.push(tableObject);
    }
    interface columnObj {
      table_name: string;
      column_name: string;
      data_type: string;
      primary_key?: boolean;
      foreign_key?: boolean;
      linkedTable?: string;
      linkedTableColumn?: string;
    }

    /*

    tableName1: {},
    tableName2: {},
  }
  */
    // interface innerObj {
    //   string: columnObj;
    // }
    const nodesObj: Record<string, Record<string, columnObj>> = {};
    for (const table of tablesToRender) nodesObj[table] = {};
    console.log(splitBySpace);
    // find columns in each table
    if (Object.keys(tableAlias).length) {
      for (let j = 0; j < splitBySpace.length; j++) {
        const currEl = splitBySpace[j];
        const prevEl = splitBySpace[j - 1];
        if (currEl === 'FROM') break;
        if (prevEl in tableAlias) {
          if (currEl === '*') {
            for (let k = 0; k < SampleData.length; k++) {
              if (SampleData[k].table_name in nodesObj) {
                for (let l = 0; l < SampleData[k].columns.length; l++) {
                  if (nodes[l].table_name in nodesObj)
                    nodes[l].columns = [...SampleData[k].columns];
                  break;
                }
                break;
              }
            }
          }
          // currEl is the column
        }
      }
    } else {
      // There are no aliases
      let start;
      let end;
      let tableName: string;
      for (let i = 0; i < splitBySpace.length; i++) {
        const currentString = splitBySpace[i];
        if (currentString === 'SELECT') start = i + 1;
        if (currentString === 'FROM') {
          end = i - 1;
          tableName = splitBySpace[i + 1];
        }
      }
      const columnsRendered = splitBySpace.slice(start, end);
      for (let i = 0; i < columnsRendered.length; i++) {
        // nodesObj[tableName][columnsRendered[i]] =
        //    {
        //     table_name: tableName,
        //     column_name: columnsRendered[i],
        //   },
      }
    }

    console.log('alias', tableAlias);
    console.log('tables', tablesToRender);
  }
}
parseQueryAndGenerateNodes(str, SampleData);
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
