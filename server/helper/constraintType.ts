export function currentColumnHasPrimaryKey(
  tableRelationships: any,
  currentTableName: any,
  currentColumnName: any
): boolean {
  return (
    tableRelationships.table_name === currentTableName &&
    tableRelationships.column_name === currentColumnName &&
    tableRelationships.constraint_type === 'PRIMARY KEY'
  );
}
export function currentColumnHasForeignKey(
  tableRelationships: any,
  currentTableName: any,
  currentColumnName: any
): boolean {
  return (
    tableRelationships.table_name === currentTableName &&
    tableRelationships.column_name === currentColumnName &&
    tableRelationships.constraint_type === 'FOREIGN KEY'
  );
}

export const getAllRelationShips = `
select tc.table_name, kc.column_name, tc.constraint_type, cc.table_name as table_origin, cc.column_name as table_column
from information_schema.key_column_usage kc

join information_schema.table_constraints tc
on kc.table_name = tc.table_name and kc.table_schema = tc.table_schema and kc.constraint_name = tc.constraint_name

left join information_schema.constraint_column_usage cc
on cc.constraint_name = kc.constraint_name and tc.constraint_type = 'FOREIGN KEY'

where tc.constraint_type = 'PRIMARY KEY' or tc.constraint_type = 'FOREIGN KEY'
order by tc.table_name;
`;
