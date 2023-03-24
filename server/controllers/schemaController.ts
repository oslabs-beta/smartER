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
      let prevTableName = schema.rows[0].table_name;
      tableObj.table_name = prevTableName;
      // Iterate through array of all table names, columns, and data types
      for (let i = 0; i < schema.rows.length; i++) {
        // current represents each object in the array
        const current = schema.rows[i];
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

        // Assign table name and column name
        column.table_name = current.table_name;
        column.column_name = current.column_name;
        // Assign data type
        if (current.data_type === 'integer') column.data_type = 'int';
        else if (current.data_type === 'character varying')
          column.data_type = 'varchar';
        else column[current.column_name] = current.data_type;
        // Add relationships and constraints if there are any
        if (current.primary_key_exists) column.primary_key = true;
        if (current.table_origin) {
          column.foreign_key = true;
          column.linkedTable = current.table_origin;
          column.linkedTableColumn = current.table_column;
        }

        // Push the complete column object into columns array
        tableObj.columns.push(column);
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
