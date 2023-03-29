import CustomColumnNode from './CustomColumnNode';
import { SampleData } from '../../TestData';

export const testnodes = parseNodes(SampleData);

const nodeTypes = {
  CustomColumnNode: CustomColumnNode,
};

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
        height: Object.keys(rawData[table]).length * 40 + 40 + 0,
        width: 152,
        display: 'flex',
        opacity: 0.25,
        // border: '1px solid #000',
        zIndex: 10,
      },
      draggable: true,
    };
    j++;
    nodes.push(newContainer);

    // create table name node
    const newColumnTitle = {
      id: `${table}.columnName`,
      type: 'CustomTitleNode', // swap for default of CustomTitleNode
      parentNode: `${table}.group`,
      extent: 'default',
      position: { x: 0, y: 0 + 0 },
      data: { label: table },
      sourcePosition: 'bottom',
      targetPosition: 'bottom',
      style: {
        background: '#1E3D59',
        color: 'F5F0E1',
        borderRadius: '5px',
        opacity: 1,
        transition: 'opacity 250ms ease-in',
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
        type: 'CustomColumnNode', //swap for default or CustomColumnNode
        parentNode: `${table}.group`,
        extent: 'parent',
        position: { x: 0, y: i === 0 ? 40 : i * 40 + 40 }, //Control spacing of tables here, Probably needs an algo
        data: { label: `${columnObj} | ${column.data_type}` },
        sourcePosition: 'right',
        targetPosition: 'left',
        draggable: false,
        style: {
          background: 'transparent',
          borderRadius: '',
          opacity: 1,
          transition: 'opacity 250ms ease-in',
        },
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
          background: '#FFC13B',
          borderRadius: '5px',
        };
      } else {
        newColumnNode.style = {
          background: '#6B7B8C',
          borderRadius: '5px',
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
          type: 'default',
          style: {},
          animated: false,
        };
        if (column.activeLink) {
          newEdge.animated = false;
          newEdge.style = {
            stroke: 'white',
            strokeWidth: '5',
          };
        } else {
          newEdge.animated = true;
          newEdge.style = {
            strokeWidth: '5',
            stroke: 'grey',
          };
        }
        // check if active connection

        edges.push(newEdge);
      }
    }
  }
  return edges;
}
