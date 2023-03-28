// run regex on query string
// returns list of each word in the query
// includes commas, periods, open parens, close parens as their own word
// includes words with spaces wrapped in double quotes - does not remove the quotes

// function to handle sql keywords:
// SELECT, AS, FROM, WHERE, LEFT, RIGHT, INNER, OUTER, JOIN, ON
// this may help indicate where the next word gets routed but the words themselves are ignored

// function to handle aggregations
// word followed by open (
// these words should be ignored altogether but the contents of the () should contain col names with or without table aliases

// function to handle table name:
// word following from or join

// function to handle table alias:
// word immediately following table name
// if table name is followed by a comma or key word, treat the table's own name as its alias

// function to handle column name:
// first word immediately following select
// word after select and before from that is preceded by a comma
// exception: aggregations

// function to handle column alias:
// word following AS
// word following column name with no comma between
// word following ) on aggregation if it follows above rules
// ignore these?
