import { Request, Response, NextFunction, RequestHandler } from 'express';
import { getAllQuery } from '../helper/getAllQuery';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

interface schemaControllers {
  connectDb: RequestHandler;
  getSchemaPostgreSQL: RequestHandler;
  getQueryResults: RequestHandler;
  getQueryPerformance: RequestHandler;
}
//
const schemaController: schemaControllers = {
  connectDb: async (req, res, next) => {
    /*
      FE will always send URI so below logic is not needed

      const { programmatic, pg_url } = req.body;
      // FE Provides whether or not user is logging in programmatically
      // If programmatically logging in, create a credentials object to
      // create a new connection, else we assign it the provided pg_url
      // if that is not provided, we assign it the starwars pg_url
      if (programmatic) {
        var { host, port, dbUsername, dbPassword, database } = req.body;
        var programmaticCredentials: any = {
          host,
          port,
          user: dbUsername,
          password: dbPassword,
          database,
        };
      } else {
        const PG_URL = pg_url || process.env.PG_URL_STARWARS;
        var envCredentials: any = { connectionString: PG_URL };
      }
      */

    try {
      // we should probably refactor this to get URI from db basaed on user/JWT
      const { pg_url } = req.body;
      const PG_URL = pg_url || process.env.PG_URL_STARWARS;
      var envCredentials: any = { connectionString: PG_URL };
      // const pg = new Pool(programmaticCredentials || envCredentials);
      res.locals.pg = new Pool(envCredentials);
      return next();
    } catch (error) {
      return next({
        log: `Error in schemaController.connectDb ${error}`,
        status: 400,
        message: { error },
      });
    }
  },
  getSchemaPostgreSQL: async (req, res, next) => {
    try {
      const pg = res.locals.pg;
      // Get all relationships between all tables
      // Identify the current schema name for use in full schema query
      const currentSchema = await pg.query(
        `SELECT current_schema FROM current_schema`
      );

      // Get Relationships, Tables names, Column names, Data types
      const schema = await pg.query(getAllQuery(currentSchema));

      // Table type

      const masterObj = {
        people: {
          someColumnName: {
            // EVERY DATA WE NEED
          },
        },
        films: {},
      };
      // Initialize array to hold returned data
      const erDiagram: Record<string, typeof tableObj> = {};
      let tableObj: Record<string, any> = {};
      // Assign prev table name and tableObj.table_name to be the first table name from the query
      let prevTableName = schema.rows[0].table_name;

      // Iterate through array of all table names, columns, and data types
      for (let i = 0; i < schema.rows.length; i++) {
        // current represents each object in the array
        const current = schema.rows[i];
        //column object type and declaration

        // Check to see if the prev table name does not match the current table name
        // if it doesn't match, we know we are in a different table
        // push a deep copy of the tableObj, assign the current table_name to the tableObj.table_name
        if (prevTableName !== current.table_name) {
          erDiagram[prevTableName] = { ...tableObj };
          tableObj = {};
        }
        // Update prevTableName so we can keep track of when we enter a new table
        prevTableName = current.table_name;
        tableObj[current.column_name] = {};
        // Assign table name and column name
        tableObj[current.column_name].table_name = current.table_name;
        tableObj[current.column_name].column_name = current.column_name;
        // Assign data type
        if (current.data_type === 'integer')
          tableObj[current.column_name].data_type = 'int';
        else if (current.data_type === 'character varying')
          tableObj[current.column_name].data_type = 'varchar';
        else tableObj[current.column_name].data_type = current.data_type;
        // Add relationships and constraints if there are any
        if (current.is_primary_key)
          tableObj[current.column_name].primary_key = true;
        if (current.table_origin) {
          tableObj[current.column_name].foreign_key = true;
          tableObj[current.column_name].linkedTable = current.table_origin;
          tableObj[current.column_name].linkedTableColumn =
            current.table_column;
        }

        // Push the complete column object into columns array
      }
      // return res.json(erDiagram);
      res.locals.erDiagram = erDiagram;
      return next();
    } catch (error) {
      return next({
        log: `Error in schemaController.getSchema ${error}`,
        status: 400,
        message: { error },
      });
    }
  },
  getQueryResults: async (req, res, next) => {
    try {
      const { queryString } = req.body;
      const pg = res.locals.pg;
      // Make a query based on the passed in queryString
      const getQuery = await pg.query(queryString);
      // Return query to FE
      res.json(getQuery.rows);
    } catch (error) {
      return next({
        log: `Error in schemaController.getQueryResults ${error}`,
        status: 400,
        message: { error },
      });
    }
  },
  getQueryPerformance: async (req, res, next) => {
    try {
      const pg = res.locals.pg;
      const currentSchema = await pg.query(
        `SELECT current_schema FROM current_schema`
      );

      // Get Relationships, Tables names, Column names, Data types
      const schema = await pg.query(
        `EXPLAIN (ANALYZE, COSTS, VERBOSE, BUFFERS, FORMAT JSON) ${getAllQuery(
          currentSchema
        )}`
      );

      res.json(schema.rows[0]['QUERY PLAN'][0]);
    } catch (error) {
      return next({
        log: `Error in schemaController.getQueryPerformance ${error}`,
        status: 400,
        message: { error },
      });
    }
  },
};

export default schemaController;
const d = {
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
