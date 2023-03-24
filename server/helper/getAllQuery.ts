export const getAllQuery = (currentSchema: any) => {
  return `SELECT * FROM (
    SELECT DISTINCT ON (c.table_name, c.column_name)
        c.table_name, 
        c.column_name, 
        c.data_type,
        c. ordinal_position,
        max(case when tc.constraint_type = 'PRIMARY KEY' then 1 else 0 end) OVER(PARTITION BY c.table_name, c.column_name) AS is_primary_key,
        cc.table_name as table_origin,
        cc.column_name as table_column

    FROM information_schema.key_column_usage kc

    INNER JOIN information_schema.table_constraints tc
    ON kc.table_name = tc.table_name AND kc.table_schema = tc.table_schema AND kc.constraint_name = tc.constraint_name 

    LEFT JOIN information_schema.constraint_column_usage cc
    ON cc.constraint_name = kc.constraint_name AND tc.constraint_type = 'FOREIGN KEY'

    RIGHT JOIN information_schema.columns c
    ON c.table_name = kc.table_name AND c.column_name = kc.column_name

    WHERE c.table_schema = '${currentSchema.rows[0].current_schema}' AND is_updatable = 'YES'

    ORDER BY c.table_name, c.column_name, is_primary_key desc, table_origin) subquery
  
  ORDER BY table_name, ordinal_position;`;
};

// Planning Time: 7.641 ms
// Execution Time: 101.963 ms
