import { Request, Response, NextFunction, RequestHandler } from 'express';
import { getAllQuery } from '../helper/getAllQuery';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { table } from 'console';
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
    try {
      // we should probably refactor this to get URI from db based on user/JWT
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

      const constraintArr: Record<string, string>[] = [];
      // Get Relationships, Tables names, Column names, Data types
      const schema = await pg.query(getAllQuery(currentSchema));

      // Initialize array to hold returned data
      let erDiagram: Record<string, typeof tableObj> = {};
      let tableObj: Record<string, any> = {};
      // Make custom type for any on tableObj
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
          prevTableName = current.table_name;
        }

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
        if (current.is_primary_key) {
          tableObj[current.column_name].primary_key = true;
          tableObj[current.column_name].foreign_tables = [];
        }

        if (current.table_origin) {
          const constraintObj: Record<string, string> = {};
          constraintObj[`${[current.table_origin]}.${current.table_column}`] =
            current.table_name;
          tableObj[current.column_name].foreign_key = true;
          tableObj[current.column_name].linkedTable = current.table_origin;
          tableObj[current.column_name].linkedTableColumn =
            current.table_column;

          constraintArr.push({ ...constraintObj });
        }

        // Push the complete column object into columns array
      }
      // return res.json(erDiagram);
      // if we find a foreign key
      /*[
        {
          species._id = 'people'
          },
          {
          planets._id = 'people'
          },

        ]
         */

      for (const constraint of constraintArr) {
        for (const relationship in constraint) {
          const string = relationship.split('.'); // [species, _id]
          const tableName = string[0]; // species
          const columnName = string[1]; // _id
          const tableOrigin = constraint[relationship]; // people
          erDiagram[tableName][columnName].foreign_tables.push(tableOrigin);
        }
      }

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
      const results = getQuery.rows;
      res.locals.queryResults = results;
      return next();
    } catch (error) {
      return next({
        log: `Error in schemaController.getQueryResults ${error}`,
        status: 400,
        message: { error },
      });
    }
  },
  getQueryPerformance: async (req, res, next) => {
    // this isn't called from FE but may be useful for debugging - plug JSON result into SQL explain tool
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
