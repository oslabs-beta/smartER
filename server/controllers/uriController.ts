import { RequestHandler } from 'express';
import dotenv from 'dotenv';
dotenv.config();

interface uriControllers {
  saveURI: RequestHandler;
  updateURI: RequestHandler;
}

const uriController: uriControllers = {
  saveURI: async (req, res, next) => {
    try {
      if (req.user) {
        const { email } = req.user;
        const { uri } = req.body;
        const sql = `INSERT INTO `;
      }
    } catch (error) {
      return next({
        log: `Error in uriController.saveURI ${error}`,
        status: 400,
        message: { error },
      });
    }
  },

  updateURI: async (req, res, next) => {
    try {
    } catch (error) {
      return next({
        log: `Error in uriController.updateURI ${error}`,
        status: 400,
        message: { error },
      });
    }
  },
};

export default uriController;

/*
this logic needs to go on FE
postgres://vdmddarj:x-kME_CkiRgOVnfM2CT582Q7o3Xs6LN9@ruby.db.elephantsql.com/vdmddarj

Characters you should percent-encode include:

(space): %20
%: %25
&: %26
/: %2F
:: %3A
=: %3D
?: %3F
@: %40
[: %5B
]: %5D

URI = 

uri = schema + '://' + userspec + hostspec + db name + optional parameter list
schema = postgres or postgresql
userspec = username:password


const schema = 'postgres';
const username = 'vdmddarj';
const password = 'x-kME_CkiRgOVnfM2CT582Q7o3Xs6LN9';
const host = 'ruby.db.elephantsql.com';
const port = null;
const hostspec = port ? `${host}:${port}` : host;
const database = 'vdmddarj';

const uri = `${schema}://${username}:${password}@${hostspec}/${database}`;
*/
