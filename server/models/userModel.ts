const { Pool } = require('pg');
import dotenv from 'dotenv';
dotenv.config();
const PG_URI = process.env.DATABASE_API;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

// export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database

export default {
  query: (text: string) => {
    console.log('executed query', text);
    return pool.query(text);
  },
};

// export default {
//   query: (text: string, params: string, callback: Function) => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback);
//   },
// };
