import { Statement, astVisitor, parseFirst } from 'pgsql-ast-parser';
const query = `select * from people as p
left join species s on s._id = p.species_id`;
export const aste: Statement = parseFirst(query);

/*
TEST QUERIES
table alias with AS keyword //RESULT: PASS
select * from people as p
left join species s on s._id = p.species_id

union // RESULT: PASS
union is split into two left and right which is the same as the object
passed in from just 1 select statement

columnsArr => {{alias:{name:'type'}, expr:{type:string, value:person}}}
for the select 'person' as type
const s = {
  table: { alias: { name: 'type' }, expr: { type: 'string', value: 'person' } },
  table1: {
    type: 'ref',
    name: 'name',
  },
  table2: {
    type: 'ref',
    name: 'hair_color',
  },
};
select
select 'person' as type, name, hair_color from people
union all
select 'species' as type, name, hair_colors from species

more complicated union // RESULT: PASS
where:{
    "type": "binary",
    "left": {
        "type": "ref",
        "name": "name"
    },
    "right": {
        "type": "string",
        "value": "% %"
    },
    "op": "LIKE"
}
select 'person' as type, name, hair_color from people
left join pilots on people._id = pilots.person_id
where name like '% %'
union all
select 'species' as type, name, hair_colors from species
where name like '% %'

col alias without AS keyword RESULT: PASS
select name n from people
{
    "expr": {
        "type": "ref",
        "name": "name"
    },
    "alias": {
        "name": "n"
    }
}

subquery RESULT: PASSS
select * from people p
left join (select _id, true as luke from people where name like '%Luke%')
luke on luke._id = p._id
const a = {
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
};

result: PASS
including a col that is named with a keyword (first renamed one of the people cols to join for this to be valid)
select "join" from people

result: PASS
using a keyword as col alias
select mass, diameter as "from" from people p
left join planets pl on pl._id = p.homeworld_id

result:PASS
aggregation
select concat(name, mass) from people
{
    "type": "call",
    "function": {
        "name": "concat"
    },
    "args": [
        {
            "type": "ref",
            "name": "name"
        },
        {
            "type": "ref",
            "name": "mass"
        }
    ]
}

result:PASS
aggregation with alias
select concat(name, mass) test from people
{
    "expr": {
        "type": "call",
        "function": {
            "name": "concat"
        },
    "args": [
        {
            "type": "ref",
            "name": "name"
        },
        {
            "type": "ref",
            "name": "mass"
        }
            ]
    },
    "alias": {
        "name": "test"
    }
}
result: PASS
column with space in the name
select "eye colors" from species

result: PASS
column with space in the name, using table alias
select s."eye colors" from species s
{
    "type": "ref",
    "table": {
        "name": "s"
    },
    "name": "eye colors"
}
*/
