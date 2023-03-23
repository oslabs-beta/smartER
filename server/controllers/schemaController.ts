import { Request, Response, NextFunction, RequestHandler } from 'express';
import {
  currentColumnHasForeignKey,
  currentColumnHasPrimaryKey,
  getAllRelationShips,
} from '../helper/constraintType';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

interface schemaControllers {
  getSchemaPostgreSQL: RequestHandler;
  getQueryResults: RequestHandler;
}

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
      const getRelationshipsTableNamesColumnNamesDataType = await pg.query(
        `select
        c.table_name,
        c.column_name,
        max(c.data_type) as data_type,
        max(case when tc.constraint_type = 'PRIMARY KEY' then 1 else 0 end) AS primary_key_exists,
        max(cc.table_name) as table_origin,
        max(cc.column_name) as table_column

       from information_schema.key_column_usage kc

       right join information_schema.columns c
       on c.table_name = kc.table_name and c.column_name = kc.column_name

       left join information_schema.table_constraints tc
       on kc.table_name = tc.table_name and kc.table_schema = tc.table_schema and kc.constraint_name = tc.constraint_name

       left join information_schema.constraint_column_usage cc
       on cc.constraint_name = kc.constraint_name and tc.constraint_type = 'FOREIGN KEY'

       where c.table_schema = 'public' and is_updatable = 'YES'

       group by c.table_name, c.column_name
       order by c.table_name;`
      );

      // Initialize array to hold returned data
      const erDiagram = [];
      // Table type
      interface table {
        table_name: string;
        columns: any[];
      }

      let tableObj: table = {
        table_name: '',
        columns: [],
      };
      // Assign prev table name and tableObj.table_name to be the first table name from the query
      let prevTableName =
        getRelationshipsTableNamesColumnNamesDataType.rows[0].table_name;
      tableObj.table_name =
        getRelationshipsTableNamesColumnNamesDataType.rows[0].table_name;
      // Iterate through array of all table names, columns, and data types
      for (
        let i = 0;
        i < getRelationshipsTableNamesColumnNamesDataType.rows.length;
        i++
      ) {
        // current represents each object in the array
        const current = getRelationshipsTableNamesColumnNamesDataType.rows[i];
        //column object type
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
        column[current.column_name] = current.data_type;
        if (current.primary_key_exists) column.primary_key = true;
        if (current.table_origin)
          column.linkedTable =
            current.table_origin + '.' + current.table_column;
        // Adds relationships to columns that have a constraint type, splice choice out if we find a constraint

        // prettier-ignore
        //   {
        //   if (currentColumnHasPrimaryKey(tableRelationship, current.table_name, current.column_name)) {
        //     column.primaryKey = true;

        //     break;
        //   } else if (currentColumnHasForeignKey(tableRelationship, current.table_name, current.column_name)) {
        //     column.linkedTable = tableRelationship.table_origin + '.' + tableRelationship.table_column;

        //     break;
        //   }
        //   }
        // }
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
