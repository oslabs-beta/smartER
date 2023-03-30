const data = {
  columns: [
    {
      expr: {
        type: 'ref',
        table: {
          name: 'p',
        },
        name: '*',
      },
    },
    {
      expr: {
        type: 'ref',
        table: {
          name: 's',
        },
        name: '_id',
      },
    },
    {
      expr: {
        type: 'ref',
        table: {
          name: 'h',
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
              name: 'p',
            },
            name: 'species_id',
          },
          right: {
            type: 'ref',
            table: {
              name: 's',
            },
            name: '_id',
          },
          op: '=',
        },
      },
    },
    {
      type: 'table',
      name: {
        name: 'planets',
        alias: 'h',
      },
      join: {
        type: 'LEFT JOIN',
        on: {
          type: 'binary',
          left: {
            type: 'ref',
            table: {
              name: 'p',
            },
            name: 'homeworld_id',
          },
          right: {
            type: 'ref',
            table: {
              name: 'h',
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

const tableHandler = (arr: any[]) => {
  for (let i = 0; i < arr.length; i++) {
    const currentTable = arr[i];
    const type = currentTable.type;
    switch (type) {
      case 'table': {
        const tableName = currentTable.name.name;
        const alias = currentTable.name.alias;
        if (data[tableName as keyof typeof data]) {
          // Deep copy the table from data
          mainObj[tableName] = { ...data[tableName as keyof typeof data] };
          // Update alias
          tableAlias[tableName] = tableName;
          tableAlias[alias] = tableName;
        } else {
          // Error to push because the table doesn't exist in our data
        }
        break;
      }
      case 'statement': {
        queue.push(currentTable);
        break;
      }
    }
    // mainObject[currentTable.name.name] = {...data[currentTable.name.name as keyof typeof data]}
  }
};

const examples: any = {};
// select name from people
examples.simple = {
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
examples.join = {
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
examples.union = {
  type: 'union all',
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
examples.subq = {
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
