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
      const relationships = await pg.query(getAllRelationShips);

      // Get all tables, their column names, and data types for each column
      const getTableColumnNamesAndDataType = await pg.query(`
      select table_name, column_name, data_type from information_schema.columns
      where table_schema = 'public' and is_updatable = 'YES';`);
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
      let prevTableName = getTableColumnNamesAndDataType.rows[0].table_name;
      tableObj.table_name = getTableColumnNamesAndDataType.rows[0].table_name;
      // Iterate through array of all table names, columns, and data types
      for (let i = 0; i < getTableColumnNamesAndDataType.rows.length; i++) {
        // current represents each object in the array
        const current = getTableColumnNamesAndDataType.rows[i];
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
        // Adds relationships to columns that have a constraint type, splice choice out if we find a constraint
        for (let i = 0; i < relationships.rows.length; i++) {
          const tableRelationship = relationships.rows[i];
          // prettier-ignore
          {
          if (currentColumnHasPrimaryKey(tableRelationship, current.table_name, current.column_name)) {
            column.primaryKey = true;
            relationships.rows.splice(i,1)
            break;
          } else if (currentColumnHasForeignKey(tableRelationship, current.table_name, current.column_name)) {
            column.linkedTable = tableRelationship.table_origin + '.' + tableRelationship.table_column;
            relationships.rows.splice(i,1)
            break;
          }
          }
        }
        // Push the complete column object into columns array
        tableObj.columns.push(column);
      }

      // for (let i = 0; i < relationships.rows.length; i++) {
      //   const tableRelationship = relationships.rows[i];
      //   for (let j = 0; j < erDiagram.length; j++) {
      //     const currentTableName = erDiagram[j].table_name;
      //     const columns = erDiagram[j].columns;
      //     for (let k = 0; k < columns.length; k++) {
      //       for (const key in columns[k]) {
      //         // prettier-ignore
      //         {
      //           if (currentColumnHasPrimaryKey(tableRelationship,currentTableName,key)) {
      //           columns[k].primaryKey = true;

      //           break;
      //           } else if (currentColumnHasForeignKey(tableRelationship,currentTableName,key)) {
      //           columns[k].linkedTable = tableRelationship.table_origin + '.' + tableRelationship.table_column;
      //           break;
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      return res.json(erDiagram);
      // Get current schema name
      // const getSchema = await pg.query(
      //   `SELECT current_schema from current_schema`
      // );
      // const schemaName = getSchema.rows[0].current_schema;

      // // Get all the tables in schema
      // const table_names = await pg.query(
      //   `SELECT table_name FROM information_schema.tables
      //    WHERE table_type = 'BASE TABLE'
      //    AND table_schema = '${schemaName}'`
      // );
      // // Loop through each table object
      // for (let i = 0; i < table_names.rows.length; i++) {
      //   const currentTableName = table_names.rows[i].table_name;
      //   const currentTable = table_names.rows[i];
      //   // Initialize array to hold objects that represent each column for the table
      //   currentTable.columns = [];

      //   // Get all columns of current table
      //   const getColumns = await pg.query(`
      //   SELECT column_name, data_type
      //   FROM information_schema.columns
      //   WHERE table_schema = 'public'
      //   AND table_name = '${currentTableName}';`);

      //   // Build each column object by assigning the data type and relationships
      //   for (let i = 0; i < getColumns.rows.length; i++) {
      //     const columnObj: Record<string, any> = {};
      //     const columns = getColumns.rows[i];
      //     const columnName = columns.column_name;
      //     const columnDataType = columns.data_type;
      //     // Assign data type for the current column
      //     columnObj[columnName] = columnDataType;

      //     // Iterate through relationships object and check if the the current Column has a primary key or foreign key
      //     // If a primary key exists, set primaryKey to true
      //     // If a foreign key exists, set linkedTable to the table's name and the column name that the foreign key points to
      //     for (let i = 0; i < relationships.rows.length; i++) {
      //       const tableRelationship = relationships.rows[i];
      //       // prettier-ignore
      //       {
      //           if (currentColumnHasPrimaryKey(tableRelationship,currentTableName,columnName)) {
      //           columnObj.primaryKey = true;
      //           break;
      //         } else if (currentColumnHasForeignKey(tableRelationship,currentTableName,columnName)) {
      //           columnObj.linkedTable = tableRelationship.table_origin + '.' + tableRelationship.table_column;
      //           break;
      //         }
      //       }
      //     }
      //     // Push column object to the columns array in each table object
      //     currentTable.columns.push(columnObj);
      //   }
      // }
      // return res.json(table_names.rows);
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
