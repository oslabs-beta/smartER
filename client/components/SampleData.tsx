import { table } from 'console';
import { query } from 'express';

export const SampleData = {
  films: {
    _id: {
      table_name: 'films',
      column_name: '_id',
      data_type: 'int',
    },
    title: {
      table_name: 'films',
      column_name: 'title',
      data_type: 'varchar',
    },
    episode_id: {
      table_name: 'films',
      column_name: 'episode_id',
      data_type: 'int',
    },
    opening_crawl: {
      table_name: 'films',
      column_name: 'opening_crawl',
      data_type: 'varchar',
    },
    director: {
      table_name: 'films',
      column_name: 'director',
      data_type: 'varchar',
    },
    producer: {
      table_name: 'films',
      column_name: 'producer',
      data_type: 'varchar',
    },
    release_date: {
      table_name: 'films',
      column_name: 'release_date',
      data_type: 'date',
    },
  },
  people: {
    _id: {
      table_name: 'people',
      column_name: '_id',
      data_type: 'int',
    },
    name: {
      table_name: 'people',
      column_name: 'name',
      data_type: 'varchar',
    },
    mass: {
      table_name: 'people',
      column_name: 'mass',
      data_type: 'varchar',
    },
    hair_color: {
      table_name: 'people',
      column_name: 'hair_color',
      data_type: 'varchar',
    },
    skin_color: {
      table_name: 'people',
      column_name: 'skin_color',
      data_type: 'varchar',
    },
    eye_color: {
      table_name: 'people',
      column_name: 'eye_color',
      data_type: 'varchar',
    },
    birth_year: {
      table_name: 'people',
      column_name: 'birth_year',
      data_type: 'varchar',
    },
    gender: {
      table_name: 'people',
      column_name: 'gender',
      data_type: 'varchar',
    },
    species_id: {
      table_name: 'people',
      column_name: 'species_id',
      data_type: 'bigint',
      foreign_key: true,
      linkedTable: 'species',
      linkedTableColumn: '_id',
    },
    homeworld_id: {
      table_name: 'people',
      column_name: 'homeworld_id',
      data_type: 'bigint',
      foreign_key: true,
      linkedTable: 'planets',
      linkedTableColumn: '_id',
    },
    height: {
      table_name: 'people',
      column_name: 'height',
      data_type: 'int',
    },
  },
  people_in_films: {
    person_id: {
      table_name: 'people_in_films',
      column_name: 'person_id',
      data_type: 'bigint',
      foreign_key: true,
      linkedTable: 'people',
      linkedTableColumn: '_id',
    },
    film_id: {
      table_name: 'people_in_films',
      column_name: 'film_id',
      data_type: 'bigint',
      foreign_key: true,
      linkedTable: 'films',
      linkedTableColumn: '_id',
    },
  },
  pilots: {
    _id: {
      table_name: 'pilots',
      column_name: '_id',
      data_type: 'int',
    },
    person_id: {
      table_name: 'pilots',
      column_name: 'person_id',
      data_type: 'bigint',
      foreign_key: true,
      linkedTable: 'people',
      linkedTableColumn: '_id',
    },
    vessel_id: {
      table_name: 'pilots',
      column_name: 'vessel_id',
      data_type: 'bigint',
      foreign_key: true,
      linkedTable: 'vessels',
      linkedTableColumn: '_id',
    },
  },
  planets: {
    _id: {
      table_name: 'planets',
      column_name: '_id',
      data_type: 'int',
    },
    name: {
      table_name: 'planets',
      column_name: 'name',
      data_type: 'varchar',
    },
    rotation_period: {
      table_name: 'planets',
      column_name: 'rotation_period',
      data_type: 'int',
    },
    orbital_period: {
      table_name: 'planets',
      column_name: 'orbital_period',
      data_type: 'int',
    },
    diameter: {
      table_name: 'planets',
      column_name: 'diameter',
      data_type: 'int',
    },
    climate: {
      table_name: 'planets',
      column_name: 'climate',
      data_type: 'varchar',
    },
    gravity: {
      table_name: 'planets',
      column_name: 'gravity',
      data_type: 'varchar',
    },
    terrain: {
      table_name: 'planets',
      column_name: 'terrain',
      data_type: 'varchar',
    },
    surface_water: {
      table_name: 'planets',
      column_name: 'surface_water',
      data_type: 'varchar',
    },
    population: {
      table_name: 'planets',
      column_name: 'population',
      data_type: 'bigint',
    },
  },
  planets_in_films: {
    _id: {
      table_name: 'planets_in_films',
      column_name: '_id',
      data_type: 'int',
    },
    film_id: {
      table_name: 'planets_in_films',
      column_name: 'film_id',
      data_type: 'bigint',
      foreign_key: true,
      linkedTable: 'films',
      linkedTableColumn: '_id',
    },
    planet_id: {
      table_name: 'planets_in_films',
      column_name: 'planet_id',
      data_type: 'bigint',
      foreign_key: true,
      linkedTable: 'planets',
      linkedTableColumn: '_id',
    },
  },
  species: {
    _id: {
      table_name: 'species',
      column_name: '_id',
      data_type: 'int',
    },
    name: {
      table_name: 'species',
      column_name: 'name',
      data_type: 'varchar',
    },
    classification: {
      table_name: 'species',
      column_name: 'classification',
      data_type: 'varchar',
    },
    average_height: {
      table_name: 'species',
      column_name: 'average_height',
      data_type: 'varchar',
    },
    average_lifespan: {
      table_name: 'species',
      column_name: 'average_lifespan',
      data_type: 'varchar',
    },
    hair_colors: {
      table_name: 'species',
      column_name: 'hair_colors',
      data_type: 'varchar',
    },
    skin_colors: {
      table_name: 'species',
      column_name: 'skin_colors',
      data_type: 'varchar',
    },
    eye_colors: {
      table_name: 'species',
      column_name: 'eye_colors',
      data_type: 'varchar',
    },
    language: {
      table_name: 'species',
      column_name: 'language',
      data_type: 'varchar',
    },
    homeworld_id: {
      table_name: 'species',
      column_name: 'homeworld_id',
      data_type: 'bigint',
      foreign_key: true,
      linkedTable: 'planets',
      linkedTableColumn: '_id',
    },
  },
  species_in_films: {
    _id: {
      table_name: 'species_in_films',
      column_name: '_id',
      data_type: 'int',
    },
    film_id: {
      table_name: 'species_in_films',
      column_name: 'film_id',
      data_type: 'bigint',
      foreign_key: true,
      linkedTable: 'films',
      linkedTableColumn: '_id',
    },
    species_id: {
      table_name: 'species_in_films',
      column_name: 'species_id',
      data_type: 'bigint',
      foreign_key: true,
      linkedTable: 'species',
      linkedTableColumn: '_id',
    },
  },
  starship_specs: {
    _id: {
      table_name: 'starship_specs',
      column_name: '_id',
      data_type: 'int',
    },
    hyperdrive_rating: {
      table_name: 'starship_specs',
      column_name: 'hyperdrive_rating',
      data_type: 'varchar',
    },
    MGLT: {
      table_name: 'starship_specs',
      column_name: 'MGLT',
      data_type: 'varchar',
    },
    vessel_id: {
      table_name: 'starship_specs',
      column_name: 'vessel_id',
      data_type: 'bigint',
      foreign_key: true,
      linkedTable: 'vessels',
      linkedTableColumn: '_id',
    },
  },
  vessels: {
    _id: {
      table_name: 'vessels',
      column_name: '_id',
      data_type: 'int',
    },
    name: {
      table_name: 'vessels',
      column_name: 'name',
      data_type: 'varchar',
    },
    manufacturer: {
      table_name: 'vessels',
      column_name: 'manufacturer',
      data_type: 'varchar',
    },
    model: {
      table_name: 'vessels',
      column_name: 'model',
      data_type: 'varchar',
    },
    vessel_type: {
      table_name: 'vessels',
      column_name: 'vessel_type',
      data_type: 'varchar',
    },
    vessel_class: {
      table_name: 'vessels',
      column_name: 'vessel_class',
      data_type: 'varchar',
    },
    cost_in_credits: {
      table_name: 'vessels',
      column_name: 'cost_in_credits',
      data_type: 'bigint',
    },
    length: {
      table_name: 'vessels',
      column_name: 'length',
      data_type: 'varchar',
    },
    max_atmosphering_speed: {
      table_name: 'vessels',
      column_name: 'max_atmosphering_speed',
      data_type: 'varchar',
    },
    crew: {
      table_name: 'vessels',
      column_name: 'crew',
      data_type: 'int',
    },
    passengers: {
      table_name: 'vessels',
      column_name: 'passengers',
      data_type: 'int',
    },
    cargo_capacity: {
      table_name: 'vessels',
      column_name: 'cargo_capacity',
      data_type: 'varchar',
    },
    consumables: {
      table_name: 'vessels',
      column_name: 'consumables',
      data_type: 'varchar',
    },
  },
};

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
        opacity: '1',
      },
      draggable: false,
    };
    if (!table.r) newColumnTitle.style.opacity = '0.35';
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
        style: { opacity: '1' },
      };
      if (!column.r) newColumnNode.style.opacity = '0.35';

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
    {
      // const people: {
      //   species_id: {
      //     table_name: 'people';
      //     column_name: 'species_id';
      //     data_type: 'bigint';
      //     foreign_key: true;
      //     linkedTable: 'species';
      //     linkedTableColumn: '_id';
      //   };
      //   birth_year: {
      //     table_name: 'people';
      //     column_name: 'birth_year';
      //     data_type: 'varchar';
      //   };
      // };
    }
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
