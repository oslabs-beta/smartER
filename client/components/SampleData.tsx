import { table } from 'console';
import { query } from 'express';

export const SampleData = [
  {
    table_name: 'films',
    columns: [
      {
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
      {
        table_name: 'films',
        column_name: 'opening_crawl',
        data_type: 'varchar',
      },
      {
        table_name: 'films',
        column_name: 'director',
        data_type: 'varchar',
      },
      {
        table_name: 'films',
        column_name: 'producer',
        data_type: 'varchar',
      },
      {
        table_name: 'films',
        column_name: 'release_date',
        data_type: 'date',
      },
    ],
  },
  {
    table_name: 'people',
    columns: [
      {
        table_name: 'people',
        column_name: '_id',
        data_type: 'int',
      },
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
        column_name: 'hair_color',
        data_type: 'varchar',
      },
      {
        table_name: 'people',
        column_name: 'skin_color',
        data_type: 'varchar',
      },
      {
        table_name: 'people',
        column_name: 'eye_color',
        data_type: 'varchar',
      },
      {
        table_name: 'people',
        column_name: 'birth_year',
        data_type: 'varchar',
      },
      {
        table_name: 'people',
        column_name: 'gender',
        data_type: 'varchar',
      },
      {
        table_name: 'people',
        column_name: 'species_id',
        data_type: 'bigint',
        foreign_key: true,
        linkedTable: 'species',
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
  },
  {
    table_name: 'people_in_films',
    columns: [
      {
        table_name: 'people_in_films',
        column_name: 'person_id',
        data_type: 'bigint',
        foreign_key: true,
        linkedTable: 'people',
        linkedTableColumn: '_id',
      },
      {
        table_name: 'people_in_films',
        column_name: 'film_id',
        data_type: 'bigint',
        foreign_key: true,
        linkedTable: 'films',
        linkedTableColumn: '_id',
      },
    ],
  },
  {
    table_name: 'pilots',
    columns: [
      {
        table_name: 'pilots',
        column_name: '_id',
        data_type: 'int',
      },
      {
        table_name: 'pilots',
        column_name: 'person_id',
        data_type: 'bigint',
        foreign_key: true,
        linkedTable: 'people',
        linkedTableColumn: '_id',
      },
      {
        table_name: 'pilots',
        column_name: 'vessel_id',
        data_type: 'bigint',
        foreign_key: true,
        linkedTable: 'vessels',
        linkedTableColumn: '_id',
      },
    ],
  },
  {
    table_name: 'planets',
    columns: [
      {
        table_name: 'planets',
        column_name: '_id',
        data_type: 'int',
      },
      {
        table_name: 'planets',
        column_name: 'name',
        data_type: 'varchar',
      },
      {
        table_name: 'planets',
        column_name: 'rotation_period',
        data_type: 'int',
      },
      {
        table_name: 'planets',
        column_name: 'orbital_period',
        data_type: 'int',
      },
      {
        table_name: 'planets',
        column_name: 'diameter',
        data_type: 'int',
      },
      {
        table_name: 'planets',
        column_name: 'climate',
        data_type: 'varchar',
      },
      {
        table_name: 'planets',
        column_name: 'gravity',
        data_type: 'varchar',
      },
      {
        table_name: 'planets',
        column_name: 'terrain',
        data_type: 'varchar',
      },
      {
        table_name: 'planets',
        column_name: 'surface_water',
        data_type: 'varchar',
      },
      {
        table_name: 'planets',
        column_name: 'population',
        data_type: 'bigint',
      },
    ],
  },
  {
    table_name: 'planets_in_films',
    columns: [
      {
        table_name: 'planets_in_films',
        column_name: '_id',
        data_type: 'int',
      },
      {
        table_name: 'planets_in_films',
        column_name: 'film_id',
        data_type: 'bigint',
        foreign_key: true,
        linkedTable: 'films',
        linkedTableColumn: '_id',
      },
      {
        table_name: 'planets_in_films',
        column_name: 'planet_id',
        data_type: 'bigint',
        foreign_key: true,
        linkedTable: 'planets',
        linkedTableColumn: '_id',
      },
    ],
  },
  {
    table_name: 'species',
    columns: [
      {
        table_name: 'species',
        column_name: '_id',
        data_type: 'int',
      },
      {
        table_name: 'species',
        column_name: 'name',
        data_type: 'varchar',
      },
      {
        table_name: 'species',
        column_name: 'classification',
        data_type: 'varchar',
      },
      {
        table_name: 'species',
        column_name: 'average_height',
        data_type: 'varchar',
      },
      {
        table_name: 'species',
        column_name: 'average_lifespan',
        data_type: 'varchar',
      },
      {
        table_name: 'species',
        column_name: 'hair_colors',
        data_type: 'varchar',
      },
      {
        table_name: 'species',
        column_name: 'skin_colors',
        data_type: 'varchar',
      },
      {
        table_name: 'species',
        column_name: 'eye_colors',
        data_type: 'varchar',
      },
      {
        table_name: 'species',
        column_name: 'language',
        data_type: 'varchar',
      },
      {
        table_name: 'species',
        column_name: 'homeworld_id',
        data_type: 'bigint',
        foreign_key: true,
        linkedTable: 'planets',
        linkedTableColumn: '_id',
      },
    ],
  },
  {
    table_name: 'species_in_films',
    columns: [
      {
        table_name: 'species_in_films',
        column_name: '_id',
        data_type: 'int',
      },
      {
        table_name: 'species_in_films',
        column_name: 'film_id',
        data_type: 'bigint',
        foreign_key: true,
        linkedTable: 'films',
        linkedTableColumn: '_id',
      },
      {
        table_name: 'species_in_films',
        column_name: 'species_id',
        data_type: 'bigint',
        foreign_key: true,
        linkedTable: 'species',
        linkedTableColumn: '_id',
      },
    ],
  },
  {
    table_name: 'starship_specs',
    columns: [
      {
        table_name: 'starship_specs',
        column_name: '_id',
        data_type: 'int',
      },
      {
        table_name: 'starship_specs',
        column_name: 'hyperdrive_rating',
        data_type: 'varchar',
      },
      {
        table_name: 'starship_specs',
        column_name: 'MGLT',
        data_type: 'varchar',
      },
      {
        table_name: 'starship_specs',
        column_name: 'vessel_id',
        data_type: 'bigint',
        foreign_key: true,
        linkedTable: 'vessels',
        linkedTableColumn: '_id',
      },
    ],
  },
  {
    table_name: 'vessels',
    columns: [
      {
        table_name: 'vessels',
        column_name: '_id',
        data_type: 'int',
      },
      {
        table_name: 'vessels',
        column_name: 'name',
        data_type: 'varchar',
      },
      {
        table_name: 'vessels',
        column_name: 'manufacturer',
        data_type: 'varchar',
      },
      {
        table_name: 'vessels',
        column_name: 'model',
        data_type: 'varchar',
      },
      {
        table_name: 'vessels',
        column_name: 'vessel_type',
        data_type: 'varchar',
      },
      {
        table_name: 'vessels',
        column_name: 'vessel_class',
        data_type: 'varchar',
      },
      {
        table_name: 'vessels',
        column_name: 'cost_in_credits',
        data_type: 'bigint',
      },
      {
        table_name: 'vessels',
        column_name: 'length',
        data_type: 'varchar',
      },
      {
        table_name: 'vessels',
        column_name: 'max_atmosphering_speed',
        data_type: 'varchar',
      },
      {
        table_name: 'vessels',
        column_name: 'crew',
        data_type: 'int',
      },
      {
        table_name: 'vessels',
        column_name: 'passengers',
        data_type: 'int',
      },
      {
        table_name: 'vessels',
        column_name: 'cargo_capacity',
        data_type: 'varchar',
      },
      {
        table_name: 'vessels',
        column_name: 'consumables',
        data_type: 'varchar',
      },
    ],
  },
];

export const testnodes = parseDataNodes(SampleData);

function parseDataNodes(rawData: typeof SampleData): any {
  const nodes: any = [];

  rawData.forEach((table: any, index: number) => {
    //create container/group
    const newContainer = {
      id: `${table.table_name}.group`,
      type: `group`,
      position: { x: 180 * index, y: Math.random() * 100 }, //Control spacing of tables here, Probably needs an algo
      data: { label: table.table_name },
      style: {
        display: 'flex',
        width: 150,
        height: table.columns.length * 40 + 40 + 10,
        border: '1px solid #000',
      },
      draggable: true,
    };
    nodes.push(newContainer);
    //create column title node
    const newColumnTitle = {
      id: `${table.table_name}.columnName`,
      type: 'default',
      parentNode: `${table.table_name}.group`,
      extent: 'parent',
      position: { x: 0, y: 0 + 10 },
      data: { label: table.table_name },
      sourcePosition: 'bottom',
      targetPosition: 'bottom',
      style: {
        background: 'orange',
      },
      draggable: false,
    };
    nodes.push(newColumnTitle);
    //create column nodes
    table.columns.forEach((column: any, index: number) => {
      const newColumnNode = {
        id: `${column.column_name}.${column.table_name}.node`,
        type: 'default',
        parentNode: `${column.table_name}.group`,
        extent: 'parent',
        position: { x: 0, y: index === 0 ? 40 : index * 40 + 40 },
        data: { label: `${column.column_name} | ${column.data_type}` },
        sourcePosition: 'right',
        targetPosition: 'left',
        draggable: false,
      };
      if (column.primary_key) {
        newColumnNode.data.label = `🔑  ${column.column_name} | ${column.data_type}`;
      }
      if (column.foreign_key) {
        newColumnNode.data.label = `〰️ ${column.column_name} | ${column.data_type}`;
      }
      nodes.push(newColumnNode);
    });
  });
  return nodes;
}

export const testEdges = parseDataEdges(SampleData);

function parseDataEdges(data: any): any {
  const edges: any = [];
  data.forEach((table: any, i: number) => {
    table.columns.forEach((column: any, j: number) => {
      if (column.foreign_key) {
        const newEdge = {
          id: `${column.table_name}.${column.column_name} -> ${column.linkedTableColumn}${column.column_name}`,
          source: `${column.column_name}.${column.table_name}.node`,
          target: `${column.linkedTableColumn}.${column.linkedTable}.node`,
          animated: true,
        };
        edges.push(newEdge);
      }
    });
  });
  return edges;
}

let str = `
SELECT p.*, s.name AS species, h.name AS homeworld
FROM people p
LEFT JOIN species s ON p.species_id = s._id
LEFT JOIN planets h ON p.homeworld_id = h._id`;

function parseQueryAndGenerateNodes(
  queryString: string,
  data: typeof SampleData
) {
  // Determine tables to render
  // Determine Aliases
  // after FROM
  // after JOIN
  // console.log(queryString);
  const nodes = [];

  const tablesToRender = [];
  const columnsToHighlight = {};
  const tableAlias: Record<string, string> = {};
  const splitBySpace = queryString.split(/[(\s,|.)]+/);
  console.log(splitBySpace);
  for (let i = 0; i < splitBySpace.length; i++) {
    const currentString = splitBySpace[i];
    const previousString = splitBySpace[i - 1];
    if (previousString === 'FROM' || previousString === 'JOIN') {
      tablesToRender.push(currentString);
      if (splitBySpace[i + 1] !== 'ON' || splitBySpace[i + 1] !== 'WHERE')
        tableAlias[splitBySpace[i + 1]] = currentString;
    }
  }
  for (const table of tablesToRender) {
    const tableObject: Record<string, any> = {};
    tableObject.table_name = table;
    tableObject.columns = [];
    nodes.push(tableObject);
  }

  for (let i = 0; i < tablesToRender.length; i++) {
    const currentTable = tablesToRender[i];

    for (let j = 0; j < splitBySpace.length; j++) {
      const currEl = splitBySpace[j];
      const prevEl = splitBySpace[j - 1];
      if (currEl === 'FROM') break;
      if (prevEl in tableAlias) {
        if (currEl === '*') {
          for (let k = 0; k < SampleData.length; k++) {
            if (SampleData[k].table_name === currentTable) {
              for (let l = 0; l < nodes.length; l++) {
                if (nodes[l].table_name === currentTable)
                  nodes[l].columns = [...SampleData[k].columns];
                break;
              }
              break;
            }
          }
        } else {
          for (let o = 0; o < nodes.length; o++) {
            let z = 0;
            if (
              nodes[o].table_name === tableAlias[prevEl] &&
              currentTable === tableAlias[prevEl]
            ) {
              z++;
              nodes[o].columns.push(currEl);
              // console.log('in push', nodes[o]);
            }
          }
        }
        // currEl is the column
      }
    }
  }
  console.log('alias', tableAlias);
  console.log('tables', tablesToRender);
  console.log('Nodes arr:', nodes);
  for (let i = 0; i < nodes.length; i++) {
    console.log('Table_name', nodes[i].table_name, 'columns', nodes[i].columns);
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
