import { Request, Response, NextFunction, RequestHandler } from 'express';
import { getAllQuery } from '../helper/getAllQuery';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

interface schemaControllers {
  getSchemaPostgreSQL: RequestHandler;
  getQueryResults: RequestHandler;
}
//
const schemaController: schemaControllers = {
  getSchemaPostgreSQL: async (req, res, next) => {
    try {
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
      const pg = new Pool(programmaticCredentials || envCredentials);

      // Get all relationships between all tables
      const currentSchema = await pg.query(
        `select current_schema from current_schema`
      );
      // Get Relationships, Tables names, Column names, Data types
      const RTNCNDT = await pg.query(getAllQuery(currentSchema));

      // Table type
      interface table {
        table_name: string;
        columns: any[];
      }
      // Initialize array to hold returned data
      const erDiagram = [];
      let tableObj: table = {
        table_name: '',
        columns: [],
      };
      // Assign prev table name and tableObj.table_name to be the first table name from the query
      let prevTableName = RTNCNDT.rows[0].table_name;
      tableObj.table_name = RTNCNDT.rows[0].table_name;
      // Iterate through array of all table names, columns, and data types
      for (let i = 0; i < RTNCNDT.rows.length; i++) {
        // current represents each object in the array
        const current = RTNCNDT.rows[i];
        //column object type and declaration
        const column: Record<string, any> = {};

        // Check to see if the prev table name does not match the current table name
        // if it doesn't match, we know we are in a different table
        // push a deep copy of the tableObj, assign the current table_name to the tableObj.table_name
        if (prevTableName !== current.table_name) {
          erDiagram.push({ ...tableObj });
          tableObj.table_name = current.table_name;
          tableObj.columns = [];
        }
        // Update prevTableName so we can keep track of when we enter a new table
        prevTableName = current.table_name;

        // create column_name : data_type key value pair on column
        if (current.data_type === 'integer')
          column[current.column_name] = 'int';
        else if (current.data_type === 'character varying')
          column[current.column_name] = 'varchar';
        else column[current.column_name] = current.data_type;

        if (current.primary_key_exists)
          // Check if primary key exists and if foreign key exists
          column.primary_key = true;
        if (current.table_origin)
          column.linkedTable =
            current.table_origin + '.' + current.table_column;

        // Push the complete column object into columns array
        tableObj.columns.push(column);
      }
      return res.json(erDiagram);
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
      // FE Provides whether or not user is logging in programmatically
      // If programmatically logging in, create a credentials object to
      // create a new connection, else we assign it the provided pg_url
      // if that is not provided, we assign it the starwars pg_url
      const { programmatic, pg_url, queryString } = req.body;
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
      const pg = new Pool(programmaticCredentials || envCredentials);
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
};

export default schemaController;
const sampleData = {
  people_in_films: {
    columns: {
      _id: { dataType: 'integer', primaryKey: true },
      person_id: { dataType: 'bigint', linkedTable: 'people._id' },
      film_id: { dataType: 'bigint', linkedTable: 'films._id' },
    },
  },
};
