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
