import CustomColumnNode from './CustomColumnNode';
import React from 'react';
import IonIcon from '@reacticons/ionicons';

export function parseNodes(rawData: any): any {
  const standardHeight = 25;
  // const pkey = <FontAwesomeIcon icon={p_key} />;
  const pkey = <IonIcon id="pkey" name="key" />;
  const fkey = <IonIcon id="fkey" name="key-outline" />;

  const nodes: any = [];
  let j = 0;
  for (const table in rawData) {
    // create GROUPS
    const newContainer = {
      id: `${table}.group`,
      type: 'group',
      // position: { x: 200 * j, y: Math.random() * 100 }, //Control spacing of tables here, Probably needs an algo
      data: { label: table },
      style: {
        height:
          Object.keys(rawData[table]).length * standardHeight +
          standardHeight +
          0,
        width: 180, //was 152
        display: 'flex',
        opacity: 0.25,
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
        width: 180,
        height: standardHeight,
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
        position: {
          x: 0,
          y: i === 0 ? standardHeight : i * standardHeight + standardHeight,
        }, //Control spacing of tables here, Probably needs an algo
        data: {
          label: `${columnObj} | ${column.data_type}`,
          icon: <div>&emsp;</div>,
          columnName: columnObj,
          dataType: column.data_type,
        },
        sourcePosition: 'right',
        targetPosition: 'left',
        draggable: false,
        style: {
          background: 'transparent',
          borderRadius: '',
          opacity: 1,
          transition: 'opacity 250ms ease-in',
          width: 180,
          height: standardHeight,
        },
      };

      if (column.primary_key) {
        newColumnNode.data.icon = pkey;
        newColumnNode.data.columnName = `${columnObj}`;
        newColumnNode.data.dataType = `${column.data_type}`;
      }
      if (column.foreign_key) {
        newColumnNode.data.icon = fkey;
        newColumnNode.data.columnName = `${columnObj}`;
        newColumnNode.data.dataType = `${column.data_type}`;
      }
      //check if active column
      if (column.activeColumn) {
        newColumnNode.style = {
          background: '#FFC13B',
          borderRadius: '5px',
          width: 180,
          opacity: 1,
          transition: 'opacity 250ms ease-in',
          height: standardHeight,
        };
      } else {
        newColumnNode.style = {
          background: '#6B7B8C',
          borderRadius: '5px',
          width: 180,
          opacity: 1,
          transition: 'opacity 250ms ease-in',
          height: standardHeight,
        };
      }
      nodes.push(newColumnNode);
      i++;
    }
  }
  return nodes;
}

export function parseEdges(data: any): any {
  const edges: any = [];
  for (const table in data) {
    for (const columnObj in data[table]) {
      const columnName = data[table][columnObj].column_name;
      const column = data[table][columnObj];
      if (column.foreign_key) {
        const newEdge = {
          id: `${table}.${columnName}->${column.linkedTableColumn}.${column.column_name}`,
          source: `${columnName}.${table}.node`,
          target: `${column.linkedTableColumn}.${column.linkedTable}.node`,
          type: 'default',
          style: {},
          animated: false,
        };
        if (column.activeLink && data[column.linkedTable]) {
          newEdge.animated = false;
          newEdge.style = {
            stroke: 'white',
            strokeWidth: '5',
          };
        } else {
          newEdge.animated = false;
          newEdge.style = {
            strokeWidth: '3',
            stroke: 'grey',
            strokeDasharray: '5,5',
          };
        }
        // check if active connection

        edges.push(newEdge);
      }
    }
  }
  return edges;
}
