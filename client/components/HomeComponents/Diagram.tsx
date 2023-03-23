import React, {FC, useContext, useState, useCallback} from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {SampleData} from '../SampleData';

const initialNodes = [
  // {
  //   id: '0',
  //   type: 'group',
  //   position: {x: 200, y: 200},
  //   data: {label: '0'},
  //   style: {
  //     display: 'flex',
  //     width: 150,
  //     height: 80,
  //     border: '1px solid #000',
  //   },
  // },
  // {
  //   id: '1',
  //   type: 'input',
  //   parentNode: '0',
  //   extent: 'parent',
  //   position: {x: 0, y: 0},
  //   data: {label: '1'},
  //   sourcePosition: 'right',
  //   targetPosition: 'left',
  // },
  // {
  //   id: '2',
  //   type: 'input',
  //   parentNode: '0',
  //   extent: 'parent',
  //   position: {x: 0, y: 40},
  //   data: {label: '2'},
  //   sourcePosition: 'right',
  //   targetPosition: 'left',
  // },

  // {
  //   id: '3',
  //   position: {x: 400, y: 400},
  //   data: {label: '3'},
  //   sourcePosition: 'right',
  //   targetPosition: 'left',
  // },
  {
    id: '4',
    position: {x: 400, y: 500},
    data: {label: '4'},
    sourcePosition: 'right',
    targetPosition: 'left',
    children: [
      {id: 'test', data: {label: 'hello'}, x: 0, y: 0},
      {id: 'test2', data: {label: 'world'}, x: 0, y: 0},
    ],
  },
];
const initialEdges = [
  // {id: 'e1-2', source: '1', target: '2', animated: true},
  {id: 'e2-3', source: '2', target: '3', animated: true},
];
const Diagram: React.FC<{}> = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)!;
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlowProvider>
      <div className="diagram-box">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default Diagram;

//Hide nodes docs, but hides ALL nodes: https://reactflow.dev/docs/examples/nodes/hidden/
//Edge styling: https://reactflow.dev/docs/examples/edges/custom-edge/
// 3/21 Sample Data from Brian

// Create an algorithm to take SampleData and match it to the structure of initialNodes and initialEdges
// const initialNodesTest: any = [];
// const initialEdgesTest: any = [];

// let x = 0;
// let y = 0;
// function parseData(data: any) {
//   data.forEach((table: any): any => {
//     let node: any = {};
//     //Create a group node for each table_name
//     node.id = `${table.table_name}_group`;
//     node.type = 'group';
//     node.position = {x: (x += 50), y: (y += 50)};
//     node.data = {label: `${table.table_name}_group`};
//     node.style = {display: 'flex', width: 200, height: 100};
//     initialNodesTest.push(node);
//     node = {};

//     //Create a Title node for each table group
//     node.id = table.table_name;
//     node.type = 'input';
//     node.parentNode = `${table.table_name}_group`;
//     node.extent = 'parent';
//     node.position = {x: (x += 50), y: (y += 50)};
//     node.data = {label: table.table_name};
//     node.sourcePosition = 'right';
//     node.targetPosition = 'left';
//     initialNodesTest.push(node);
//   });
// }

// parseData(SampleData);
// console.log(initialNodesTest);

// SampleData.forEach((tableData, i) => {
//   const newNode = {
//     id: tableData.table_Name,
//     position: {x: i * 300, y: 0},
//     data: {
//       tableData,
//       updateEdge: (newEdge) => {
//         setEdges((prev) => [...prev, newEdge]);
//       },
//     },
//     type: `tableNode`,
//   };

//   setNodes((prev) => {
//     return [...prev, newNode];
//   });
// });
