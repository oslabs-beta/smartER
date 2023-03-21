import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const PG_URL = process.env.PG_URL;

const pg = new Pool({ connectionString: PG_URL });

interface schemaControllers {
  getSchema: RequestHandler;
}

const schemaController: schemaControllers = {
  getSchema: async (req, res, next) => {
    try {
      const { query } = req.body;
      // Get all the tables in schema
      const table_names = await pg.query(
        `SELECT table_name FROM information_schema.tables
         WHERE table_type = 'BASE TABLE'
         AND table_schema = 'public'`
      );
      // Loop through each table object
      for (let i = 0; i < table_names.rows.length; i++) {
        const currentTableName = table_names.rows[i].table_name;
        const currentTable = table_names.rows[i];
        // Initialize array for each table
        currentTable.columns = [];
        // Get all columns of current table
        const columns = await pg.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = '${currentTableName}';`);

        for (let i = 0; i < columns.rows.length; i++) {
          const columnObj: Record<string, string> = {};
          const columnNames = columns.rows[i];
          columnObj[columnNames.column_name] = columnNames.data_type;
          currentTable.columns.push(columnObj);
        }
      }
      res.json(table_names.rows);
      // query DB
    } catch (error) {
      return next({
        log: `Error in schemaController.getSchema ${error}`,
        status: 400,
        message: { error },
      });
    }
  },
};

export default schemaController;

const obj = {
  tableName: 'People',
  columns: [
    {
      _id: {
        primaryKey: true,
        type: 'SERIAL',
      },
    },
    {
      name: 'VARCHAR(255)',
    },
    {
      mass: 'FLOAT',
    },
    {
      hair_color: 'VARCHAR(255)',
    },
    {
      skin_color: 'VARCHAR(255)',
    },
    {
      eye_color: 'VARCHAR(255)',
    },
    {
      birth_year: 'VARCHAR(255)',
    },
    {
      gender: 'VARCHAR(255)',
    },
    {
      height: 'INT',
    },
    {
      Species_id: {
        linkedTable: 'Species._id',
        type: 'INT',
      },
    },
  ],
};
