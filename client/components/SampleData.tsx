export const SampleData = [
  {
    table_name: 'films',
    columns: [
      {
        _id: 'int',
        primary_key: true,
      },
      {
        opening_crawl: 'varchar',
      },
      {
        producer: 'varchar',
      },
      {
        release_date: 'date',
      },
      {
        director: 'varchar',
      },
      {
        title: 'varchar',
      },
      {
        episode_id: 'int',
      },
    ],
  },
  {
    table_name: 'people',
    columns: [
      {
        _id: 'int',
        primary_key: true,
      },
      {
        skin_color: 'varchar',
      },
      {
        birth_year: 'varchar',
      },
      {
        eye_color: 'varchar',
      },
      {
        gender: 'varchar',
      },
      {
        hair_color: 'varchar',
      },
      {
        height: 'int',
      },
      {
        mass: 'varchar',
      },
      {
        name: 'varchar',
      },
      {
        species_id: 'bigint',
        linkedTable: 'species._id',
      },
      {
        homeworld_id: 'bigint',
        linkedTable: 'planets._id',
      },
    ],
  },
  {
    table_name: 'people_in_films',
    columns: [
      {
        person_id: 'bigint',
        primary_key: true,
        linkedTable: 'people._id',
      },
      {
        film_id: 'bigint',
        primary_key: true,
        linkedTable: 'films._id',
      },
    ],
  },
  {
    table_name: 'pilots',
    columns: [
      {
        _id: 'int',
        primary_key: true,
      },
      {
        vessel_id: 'bigint',
        linkedTable: 'vessels._id',
      },
      {
        person_id: 'bigint',
        linkedTable: 'people._id',
      },
    ],
  },
  {
    table_name: 'planets',
    columns: [
      {
        _id: 'int',
        primary_key: true,
      },
      {
        surface_water: 'varchar',
      },
      {
        terrain: 'varchar',
      },
      {
        climate: 'varchar',
      },
      {
        diameter: 'int',
      },
      {
        gravity: 'varchar',
      },
      {
        name: 'varchar',
      },
      {
        orbital_period: 'int',
      },
      {
        population: 'bigint',
      },
      {
        rotation_period: 'int',
      },
    ],
  },
  {
    table_name: 'planets_in_films',
    columns: [
      {
        _id: 'int',
        primary_key: true,
      },
      {
        planet_id: 'bigint',
        linkedTable: 'planets._id',
      },
      {
        film_id: 'bigint',
        linkedTable: 'films._id',
      },
    ],
  },
  {
    table_name: 'species',
    columns: [
      {
        _id: 'int',
        primary_key: true,
      },
      {
        average_height: 'varchar',
      },
      {
        classification: 'varchar',
      },
      {
        eye_colors: 'varchar',
      },
      {
        hair_colors: 'varchar',
      },
      {
        language: 'varchar',
      },
      {
        name: 'varchar',
      },
      {
        skin_colors: 'varchar',
      },
      {
        average_lifespan: 'varchar',
      },
      {
        homeworld_id: 'bigint',
        linkedTable: 'planets._id',
      },
    ],
  },
  {
    table_name: 'species_in_films',
    columns: [
      {
        _id: 'int',
        primary_key: true,
      },
      {
        species_id: 'bigint',
        linkedTable: 'species._id',
      },
      {
        film_id: 'bigint',
        linkedTable: 'films._id',
      },
    ],
  },
  {
    table_name: 'starship_specs',
    columns: [
      {
        _id: 'int',
        primary_key: true,
      },
      {
        MGLT: 'varchar',
      },
      {
        hyperdrive_rating: 'varchar',
      },
      {
        vessel_id: 'bigint',
        linkedTable: 'vessels._id',
      },
    ],
  },
  {
    table_name: 'vessels',
    columns: [
      {
        _id: 'int',
        primary_key: true,
      },
      {
        consumables: 'varchar',
      },
      {
        cost_in_credits: 'bigint',
      },
      {
        crew: 'int',
      },
      {
        length: 'varchar',
      },
      {
        manufacturer: 'varchar',
      },
      {
        model: 'varchar',
      },
      {
        name: 'varchar',
      },
      {
        passengers: 'int',
      },
      {
        vessel_class: 'varchar',
      },
      {
        vessel_type: 'varchar',
      },
      {
        max_atmosphering_speed: 'varchar',
      },
      {
        cargo_capacity: 'varchar',
      },
    ],
  },
];

export const testnodes = parseDataNodes(SampleData);

//PARSE NODES
function parseDataNodes(rawData: any): any {
  //40 <-- this is the height of a node
  const nodes: any = [];
  rawData.map((table: any, index: number) => {
    //create Table container
    nodes.push({
      id: `${table.table_name}.group`,
      type: 'group',
      position: { x: 180 * index, y: Math.random() * 100 }, //Control spacing of tables here, Probably needs an algo
      data: { label: table.table_name },
      style: {
        display: 'flex',
        width: 150,
        height: table.columns.length * 40 + 40 + 10,
        border: '1px solid #000',
      },
      draggable: true,
    });
    //create Column name node
    nodes.push({
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
    });

    //Helper func to iterate through the columns property
    // parseColumns(tables.columns);
    table.columns.forEach((column: any, index: number) => {
      const newNode = {
        id: `${Object.keys(column)[0]}.${table.table_name}.node`,
        type: 'default',
        parentNode: `${table.table_name}.group`,
        extent: 'parent',
        position: { x: 0, y: index === 0 ? 40 : index * 40 + 40 },
        data: {
          label: `${Object.keys(column)[0]} | ${
            column[Object.keys(column)[0]]
          }`,
        },
        sourcePosition: 'right',
        targetPosition: 'left',
        draggable: false,
      };
      if (column.hasOwnProperty('primaryKey'))
        newNode.data.label = `🔑 ${Object.keys(column)[0]} | ${
          column[Object.keys(column)[0]]
        }`;
      if (column.hasOwnProperty('linkedTable'))
        newNode.data.label = `〰️  ${Object.keys(column)[0]} | ${
          column[Object.keys(column)[0]]
        }`;
      nodes.push(newNode);
    });
  });

  return nodes;
}

// console.log(parseDataNodes(SampleData));
export const testEdges = parseDataEdges(SampleData);

//PARSE EDGES
function parseDataEdges(data: any): any {
  const edges: any = [];
  data.forEach((table: any, i: number) => {
    table.columns.forEach((column: any, j: number) => {
      if (column.hasOwnProperty('linkedTable')) {
        const newEdge = {
          id: `${table.table_name}.${
            Object.keys(column)[0]
          } -> ${column.linkedTable.split('.')}`,
          source: `${Object.keys(column)[0]}.${table.table_name}.node`,
          target: `${column.linkedTable.split('.')[1]}.${
            column.linkedTable.split('.')[0]
          }.node`,
          animated: true,
        };
        edges.push(newEdge);
      }
    });
  });
  return edges;
}
