import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import db from '../models/userModel';
import { table } from 'console';
dotenv.config();

interface schemaControllers {
  connectDb: RequestHandler;
  getSchemaPostgreSQL: RequestHandler;
  getQueryResults: RequestHandler;
}
//
const schemaController: schemaControllers = {
  connectDb: async (req, res, next) => {
    try {
      console.log('running connectDb');
      const { dbId } = req.cookies;
      if (!dbId) throw new Error('no db cookie');

      const dbResult = await db.query(`
        SELECT uri FROM databases
        WHERE _id = ${dbId}
      ;`);
      const pg_uri = decodeURIComponent(dbResult.rows[0].uri);

      // const pg_uri = process.env.PG_URL_STARWARS;
      var envCredentials: any = { connectionString: pg_uri };
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
      const currentSchemaSQL = await pg.query(
        `SELECT current_schema FROM current_schema`
      );

      const currentSchema = currentSchemaSQL.rows[0].current_schema;

      const constraintArr: Record<string, string>[] = [];
      // Get Relationships, Tables names, Column names, Data types
      const query = `SELECT * FROM (
        SELECT DISTINCT ON (c.table_name, c.column_name)
            c.table_name,
            c.column_name,
            c.data_type,
            c. ordinal_position,
            max(case when tc.constraint_type = 'PRIMARY KEY' then 1 else 0 end) OVER(PARTITION BY c.table_name, c.column_name) AS is_primary_key,
            cc.table_name as table_origin,
            cc.column_name as table_column

        FROM information_schema.key_column_usage kc

        INNER JOIN information_schema.table_constraints tc
        ON kc.table_name = tc.table_name AND kc.table_schema = tc.table_schema AND kc.constraint_name = tc.constraint_name

        LEFT JOIN information_schema.constraint_column_usage cc
        ON cc.constraint_name = kc.constraint_name AND tc.constraint_type = 'FOREIGN KEY'

        RIGHT JOIN information_schema.columns c
        ON c.table_name = kc.table_name AND c.column_name = kc.column_name

        WHERE c.table_schema = '${currentSchema}' AND is_updatable = 'YES'

        ORDER BY c.table_name, c.column_name, is_primary_key desc, table_origin) subquery

      ORDER BY table_name, ordinal_position;`;
      const schema = await pg.query(query);
      // console.log('SCHEMA', schema.rows);

      // Initialize array to hold returned data
      let erDiagram: Record<string, typeof tableObj> = {};
      let tableObj: Record<string, any> = {};
      // Make custom type for any on tableObj

      // Iterate through array of all table names, columns, and data types
      for (let i = 0; i < schema.rows.length; i++) {
        let nextTableName;
        if (schema.rows[i + 1]) nextTableName = schema.rows[i + 1].table_name;
        // current represents each object in the array
        const current = schema.rows[i];
        //column object type and declaration

        // Assign table name and column name
        tableObj[current.column_name] = {};
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
        // table_origin is only given when column is a foreign key
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

        // if table name at next row is a different table,
        // push a deep copy of the tableObj to final ER diagram and reset tableObj
        if (!nextTableName || nextTableName !== current.table_name) {
          erDiagram[current.table_name] = { ...tableObj };
          tableObj = {};
        }
      }

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
        log: `Error in schemaController.getSchemaPostgreSQL ${error}`,
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
};

export default schemaController;
