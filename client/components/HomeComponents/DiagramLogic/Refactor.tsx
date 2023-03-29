// run regex on query string
// returns list of each word in the query
// includes commas, periods, open parens, close parens as their own word
// includes words with spaces wrapped in double quotes - does not remove the quotes

// general quirks:
// table names can be repeated
// union: 2 queries with the same number of columns (2 select statements that may or may not be wrapped in ())

// handle sql keywords:
// SELECT, AS, FROM, WHERE, LEFT, RIGHT, INNER, OUTER, JOIN, ON, UNION, ALL, DISTINCT, PARTITION
// this may help indicate where the next word gets routed but the words themselves are ignored
// some may not be relevant to anything besides knowing to ignore them
// WHERE ends current query
// LEFT, RIGHT, INNER, OUTER should be followed by JOIN keyword
// JOIN is followed by table name

// find close )s in the case of subqueries or aggregations

// handle subqueries:
// open ( followed by SELECT

// handle aggregations:
// word followed by open (
// these words should be ignored altogether but the contents of the () should contain col names with or without table aliases

// handle literals:
// word wrapped in ''
// numbers, bools? that are not col names in select statement
// e.g., select 'person' as type, name from people would return an entire col called type with values as person

// handle table name:
// word following from or join

// handle table alias:
// word immediately following table name
// word following table name + AS
// select p.* from people as p
// if table name is followed by a comma or key word, treat the table's own name as its alias

// handle column name:
// first word immediately following select
// word after select and before from that is preceded by a comma
// exception: aggregations

// handle column alias:
// word following AS
// word following column name with no comma between
// word following ) on aggregation if it follows above rules
// ignore these?

// handle references to table alias
// word preceding .

// link col names to their tables
// word following ., link by alias
// if only 1 table, matched by default
// otherwise look in all the tables -> if it returns more than one result error??
// should be distinct

// handle wildcards
// if it follows a ., highlight all cols from that table
// else highlight all cols from all tables in query

// ----------------

// select name from people
const a = {
  columns: [
    {
      expr: {
        type: 'ref',
        name: 'name',
      },
    },
  ],
  from: [
    {
      type: 'table',
      name: {
        name: 'people',
      },
    },
  ],
  type: 'select',
};

// select p.name from people p
// left join species s on s._id = p.species_id
const s = {
  columns: [
    {
      expr: {
        type: 'ref',
        table: {
          name: 'p',
        },
        name: 'name',
      },
    },
  ],
  from: [
    {
      type: 'table',
      name: {
        name: 'people',
        alias: 'p',
      },
    },
    {
      type: 'table',
      name: {
        name: 'species',
        alias: 's',
      },
      join: {
        type: 'LEFT JOIN',
        on: {
          type: 'binary',
          left: {
            type: 'ref',
            table: {
              name: 's',
            },
            name: '_id',
          },
          right: {
            type: 'ref',
            table: {
              name: 'p',
            },
            name: 'species_id',
          },
          op: '=',
        },
      },
    },
  ],
  type: 'select',
};

// select 'person' as type, name, hair_color from people
// union all
// select 'species' as type, name, hair_colors from species
const union = {
  type: 'union all',
  // -----------------LEFT-----------------
  left: {
    columns: [
      {
        expr: {
          type: 'string',
          value: 'person',
        },
        alias: {
          name: 'type',
        },
      },
      {
        expr: {
          type: 'ref',
          name: 'name',
        },
      },
      {
        expr: {
          type: 'ref',
          name: 'hair_color',
        },
      },
    ],
    from: [
      {
        type: 'table',
        name: {
          name: 'people',
        },
      },
    ],
    type: 'select',
  },
  // ---------------RIGHT--------------
  right: {
    columns: [
      {
        expr: {
          type: 'string',
          value: 'species',
        },
        alias: {
          name: 'type',
        },
      },
      {
        expr: {
          type: 'ref',
          name: 'name',
        },
      },
      {
        expr: {
          type: 'ref',
          name: 'hair_colors',
        },
      },
    ],
    from: [
      {
        type: 'table',
        name: {
          name: 'species',
        },
      },
    ],
    type: 'select',
  },
};

// select * from people p
// left join (select _id, true as luke from people where name like '%Luke%') luke on luke._id = p._id
const subq = {
  columns: [
    {
      expr: {
        type: 'ref',
        name: '*',
      },
    },
  ],
  from: [
    {
      type: 'table',
      name: {
        name: 'people',
        alias: 'p',
      },
    },
    {
      type: 'statement',
      statement: {
        columns: [
          {
            expr: {
              type: 'ref',
              name: '_id',
            },
          },
          {
            expr: {
              type: 'boolean',
              value: true,
            },
            alias: {
              name: 'luke',
            },
          },
        ],
        from: [
          {
            type: 'table',
            name: {
              name: 'people',
            },
          },
        ],
        where: {
          type: 'binary',
          left: {
            type: 'ref',
            name: 'name',
          },
          right: {
            type: 'string',
            value: '%Luke%',
          },
          op: 'LIKE',
        },
        type: 'select',
      },
      alias: 'luke',
      join: {
        type: 'LEFT JOIN',
        on: {
          type: 'binary',
          left: {
            type: 'ref',
            table: {
              name: 'luke',
            },
            name: '_id',
          },
          right: {
            type: 'ref',
            table: {
              name: 'p',
            },
            name: '_id',
          },
          op: '=',
        },
      },
    },
  ],
  type: 'select',
};

/*
  recurse thru array/obj - look for
  1. obj with key of type and val 'select'
    - when we find this object, we call our main function
  within that object:
  2. columns array
    - expr.name (possibly others)
    - expr.table.name -> links to table alias
  3. from array
    - name.name
    - name.alias
    - join.on.left, join.on.right -> gives join col names/tables


  functions to handle
  - overall routing
  - parsing cols array
    - each column
    - match cols to tables
  - parsing from array
    - each table
    - joins

// prettier-ignore
{
  - master function ids type: select objects
    - select handler
    - routes to from obj handler
      - route joins to joins handler
      - pass back object containing all relevant tables with cols from ER obj
        - add join flags to colums
        - separate alias obj { alias: tableName }
      - sepearate object to track next level out?
    - use tables obj (in closure) to cols handler
      - find each col in AST obj, look for it in tables object based on
        1. alias if we have one
        2. else flag every column with the given name
        3. * if no alias, flag every column of every table, else flag every column of relevant table
    - once flagged cols passed back, add in next level out
      - think about stretch goal of multiple levels when building
    - calls itself recursively as additional nested select objects are found
  ** along the way if we find errors, push to errors array (cols that don't exist, duplicate cols,
   tables that don't exist, etc.)
}
*/

/*
mainfunc (AST) {
  const errorArr = []
  const mainObject = {}
  const tableAlias = {}

    if (select) {
      invoke select handler
    } else {
      keep searching at all levels of depth
    }

    selectHandler (obj) {
      invoke tableHandler(obj.from)
      invoke columnHandler(obj.columns)
    }

    tableHandler () {
      if (select) {
        invoke selectHandler
      } else if join {
        apply join logic / joinHandler?
      }
      else {
        apply logic
      }
    }

    columnHandler () {
      if (select) {
        invoke selectHandler
      } else {
        apply logic
        if error found push to errorArr
      }
    }
  return {errorArr: [], mainobj: {}}
}

*/
