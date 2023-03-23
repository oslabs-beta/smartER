export const getAllQuery = (currentSchema: any) => {
  return `select
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

 where c.table_schema = '${currentSchema.rows[0].current_schema}' and is_updatable = 'YES'

 group by c.table_name, c.column_name
 order by c.table_name, primary_key_exists desc, table_origin desc;`;
};
