import { SampleData } from '../../TestData';

export const testnodes = parseNodes(SampleData);

//Reusable function for getting DB ER Data to then parse
export const getERDiagram = async () => {
  try {
    const data = await fetch('/api/getSchema', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const parsedData = await data.json();
    return parsedData;
  } catch (error) {
    console.log(`Error in getERDiagram: ${error}`);
  }
};

export function parseNodes(rawData: any): any {
  const nodes: any = [];
  let j = 0;
  for (const table in rawData) {
    // create GROUPS
    const newContainer = {
      id: `${table}.group`,
      type: 'group',
      position: { x: 180 * j, y: Math.random() * 100 }, //Control spacing of tables here, Probably needs an algo
      data: { label: table },
      style: {
        display: 'flex',
        width: 150,
        height: Object.keys(rawData[table]).length * 40 + 40 + 10,
        border: '1px solid #000',
      },
      draggable: true,
    };
    j++;
    nodes.push(newContainer);

    // create table name node
    const newColumnTitle = {
      id: `${table}.columnName`,
      type: 'default',
      parentNode: `${table}.group`,
      extent: 'parent',
      position: { x: 0, y: 0 + 10 },
      data: { label: table },
      sourcePosition: 'bottom',
      targetPosition: 'bottom',
      style: {
        background: 'orange',
        opacity: '1',
      },
      draggable: false,
    };
    nodes.push(newColumnTitle);

    //create Column nodes
    let i = 0;
    for (const columnObj in rawData[table]) {
      const column = rawData[table][columnObj];
      const newColumnNode = {
        id: `${columnObj}.${table}.node`,
        type: 'default',
        parentNode: `${table}.group`,
        extent: 'parent',
        position: { x: 0, y: i === 0 ? 40 : i * 40 + 40 }, //Control spacing of tables here, Probably needs an algo
        data: { label: `${columnObj} | ${column.data_type}` },
        sourcePosition: 'right',
        targetPosition: 'left',
        draggable: false,
        style: { opacity: '1', background: 'transparent' },
      };

      if (column.primary_key) {
        newColumnNode.data.label = `🔑  ${columnObj} | ${column.data_type}`;
      }
      if (column.foreign_key) {
        newColumnNode.data.label = `〰️ ${columnObj} | ${column.data_type}`;
      }
      //check if active column
      if (column.activeColumn) {
        newColumnNode.style = {
          background: 'skyblue',
        };
      } else {
        newColumnNode.style = {
          background: 'salmon',
        };
      }
      nodes.push(newColumnNode);
      i++;
    }
  }
  return nodes;
}
export const testEdges = parseEdges(SampleData);

export function parseEdges(data: any): any {
  const edges: any = [];
  for (const table in data) {
    for (const columnObj in data[table]) {
      const columnName = data[table][columnObj].column_name;
      const column = data[table][columnObj];
      if (column.foreign_key) {
        const newEdge = {
          id: `${table}.${columnName}->${column.linkedTableColumn}${column.column_name}`,
          source: `${columnName}.${table}.node`,
          target: `${column.linkedTableColumn}.${column.linkedTable}.node`,
        };
        if (column.activeLink) {
          newEdge.animated = false;
        } else {
          newEdge.animated = true;
        }
        // check if active connection

        edges.push(newEdge);
      }
    }
  }
  return edges;
}
