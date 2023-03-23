/*
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
*/

const schema = 'postgres';
const username = 'vdmddarj';
const password = 'x-kME_CkiRgOVnfM2CT582Q7o3Xs6LN9';
const host = 'ruby.db.elephantsql.com';
const port = null;
const hostspec = port ? `${host}:${port}` : host;
const database = 'vdmddarj';

const uri = `${schema}://${username}:${password}@${hostspec}/${database}`;

/*
select 
 c.table_name, 
 c.column_name, 
 c.data_type,
 tc.constraint_type,
 cc.table_name as table_origin,
 cc.column_name as table_column

from information_schema.columns c

left join information_schema.key_column_usage kc on kc.table_name = c.table_name and kc.column_name = c.column_name

left join information_schema.table_constraints tc
on kc.table_name = tc.table_name and kc.table_schema = tc.table_schema and kc.constraint_name = tc.constraint_name

left join information_schema.constraint_column_usage cc
on cc.constraint_name = kc.constraint_name and tc.constraint_type = 'FOREIGN KEY'

where c.table_schema = 'public' and is_updatable = 'YES' 

----------

select c.table_name, c.column_name, tc.constraint_type, cc.table_name as table_origin, cc.column_name as table_column, c.data_type
from information_schema.key_column_usage kc

join information_schema.table_constraints tc
on kc.table_name = tc.table_name and kc.table_schema = tc.table_schema and kc.constraint_name = tc.constraint_name

left join information_schema.constraint_column_usage cc
on cc.constraint_name = kc.constraint_name 

right join information_schema.columns c
on c.table_name = kc.table_name and c.column_name = kc.column_name

where c.table_schema = 'public' and is_updatable = 'YES' 

order by c.table_name;

-----------

select c.table_name, c.column_name, tc.constraint_type, cc.table_name as table_origin, cc.column_name as table_column, c.data_type
from information_schema.key_column_usage kc

right join information_schema.columns c
on c.table_name = kc.table_name and c.column_name = kc.column_name

left join information_schema.table_constraints tc
on kc.table_name = tc.table_name and kc.table_schema = tc.table_schema and kc.constraint_name = tc.constraint_name

left join information_schema.constraint_column_usage cc
on cc.constraint_name = kc.constraint_name and tc.constraint_type = 'FOREIGN KEY'

where c.table_schema = 'public' and is_updatable = 'YES' 

order by c.table_name;
*/
