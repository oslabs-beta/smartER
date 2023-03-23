export const SampleData = [
  {
    table_name: 'people_in_films',
    columns: [
      {
        _id: 'integer',
        primaryKey: true,
      },
      {
        person_id: 'bigint',
        linkedTable: 'people._id',
      },
      {
        film_id: 'bigint',
        linkedTable: 'films._id',
      },
    ],
  },
  {
    table_name: 'pilots',
    columns: [
      {
        _id: 'integer',
        primaryKey: true,
      },
      {
        person_id: 'bigint',
        linkedTable: 'people._id',
      },
      {
        vessel_id: 'bigint',
        linkedTable: 'vessels._id',
      },
    ],
  },
  {
    table_name: 'films',
    columns: [
      {
        _id: 'integer',
        primaryKey: true,
      },
      {
        title: 'character varying',
      },
      {
        episode_id: 'integer',
      },
      {
        opening_crawl: 'character varying',
      },
      {
        director: 'character varying',
      },
      {
        producer: 'character varying',
      },
      {
        release_date: 'date',
      },
    ],
  },
  {
    table_name: 'species_in_films',
    columns: [
      {
        _id: 'integer',
        primaryKey: true,
      },
      {
        film_id: 'bigint',
        linkedTable: 'films._id',
      },
      {
        species_id: 'bigint',
        linkedTable: 'species._id',
      },
    ],
  },
  {
    table_name: 'planets_in_films',
    columns: [
      {
        _id: 'integer',
        primaryKey: true,
      },
      {
        film_id: 'bigint',
        linkedTable: 'films._id',
      },
      {
        planet_id: 'bigint',
        linkedTable: 'planets._id',
      },
    ],
  },
  {
    table_name: 'vessels',
    columns: [
      {
        _id: 'integer',
        primaryKey: true,
      },
      {
        name: 'character varying',
      },
      {
        manufacturer: 'character varying',
      },
      {
        model: 'character varying',
      },
      {
        vessel_type: 'character varying',
      },
      {
        vessel_class: 'character varying',
      },
      {
        cost_in_credits: 'bigint',
      },
      {
        length: 'character varying',
      },
      {
        max_atmosphering_speed: 'character varying',
      },
      {
        crew: 'integer',
      },
      {
        passengers: 'integer',
      },
      {
        cargo_capacity: 'character varying',
      },
      {
        consumables: 'character varying',
      },
    ],
  },
  {
    table_name: 'species',
    columns: [
      {
        _id: 'integer',
        primaryKey: true,
      },
      {
        name: 'character varying',
      },
      {
        classification: 'character varying',
      },
      {
        average_height: 'character varying',
      },
      {
        average_lifespan: 'character varying',
      },
      {
        hair_colors: 'character varying',
      },
      {
        skin_colors: 'character varying',
      },
      {
        eye_colors: 'character varying',
      },
      {
        language: 'character varying',
      },
      {
        homeworld_id: 'bigint',
        linkedTable: 'planets._id',
      },
    ],
  },
  {
    table_name: 'people',
    columns: [
      {
        _id: 'integer',
        primaryKey: true,
      },
      {
        name: 'character varying',
      },
      {
        mass: 'character varying',
      },
      {
        hair_color: 'character varying',
      },
      {
        skin_color: 'character varying',
      },
      {
        eye_color: 'character varying',
      },
      {
        birth_year: 'character varying',
      },
      {
        gender: 'character varying',
      },
      {
        species_id: 'bigint',
        linkedTable: 'species._id',
      },
      {
        homeworld_id: 'bigint',
        linkedTable: 'planets._id',
      },
      {
        height: 'integer',
      },
    ],
  },
  {
    table_name: 'planets',
    columns: [
      {
        _id: 'integer',
        primaryKey: true,
      },
      {
        name: 'character varying',
      },
      {
        rotation_period: 'integer',
      },
      {
        orbital_period: 'integer',
      },
      {
        diameter: 'integer',
      },
      {
        climate: 'character varying',
      },
      {
        gravity: 'character varying',
      },
      {
        terrain: 'character varying',
      },
      {
        surface_water: 'character varying',
      },
      {
        population: 'bigint',
      },
    ],
  },
  {
    table_name: 'vessels_in_films',
    columns: [
      {
        _id: 'integer',
        primaryKey: true,
      },
      {
        vessel_id: 'bigint',
        linkedTable: 'vessels._id',
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
        _id: 'integer',
        primaryKey: true,
      },
      {
        hyperdrive_rating: 'character varying',
      },
      {
        MGLT: 'character varying',
      },
      {
        vessel_id: 'bigint',
        linkedTable: 'vessels._id',
      },
    ],
  },
];

function parseDataNodes(rawData: any): any {
  let groupHeight = 40;
  const nodes: any = [];
  rawData.map((table, index) => {
    //create Table container
    nodes.push({
      id: `${table.table_name}.group`,
      type: 'group',
      position: {x: 150 * index, y: 0},
      data: {label: table.table_name},
      style: {
        display: 'flex',
        width: 150,
        height: table.columns.length * 40 + 40,
        border: '1px solid #000',
      },
    });
    //create Column name node
    nodes.push({
      id: `${table.table_name}.columnName`,
      type: 'input',
      parentNode: `${table.table_name}.group`,
      extent: 'parent',
      position: {x: 0, y: 0},
      data: {label: table.table_name},
      sourcePosition: 'right',
      targetPosition: 'left',
      style: {
        background: 'orange',
      },
    });

    //Helper func to iterate through the columns property
    // parseColumns(tables.columns);
    table.columns.forEach((column, index) => {
      nodes.push({
        id: `${Object.keys(column)[0]}.${table.table_name}.node`,
        type: 'input',
        parentNode: `${table.table_name}.group`,
        extent: 'parent',
        position: {x: 0, y: index === 0 ? 40 : index * 40 + 40},
        data: {label: `${Object.keys(column)[0]}`},
        sourcePosition: 'right',
        targetPosition: 'left',
      });
    });
  });

  return nodes;
}

export const testnodes = parseDataNodes(SampleData);
console.log(parseDataNodes(SampleData));
