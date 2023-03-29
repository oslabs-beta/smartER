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
