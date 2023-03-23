import React, {FC, useContext, useState, useCallback, useEffect} from 'react';
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
import {HomepageContext} from '../../Context';
import {testnodes, testEdges} from '../SampleData';

const Diagram: React.FC<{}> = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(testnodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(testEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const {queryString} = useContext(HomepageContext)!;

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

//SAMPLE DATA for Initial rendering:

//To use, paste outside of functional component and update
//useNodeState and useEdgeState default values to initialNodes and initialEdges
/*
const initialNodes = [
  {
    id: '0',
    type: 'group',
    position: {x: 200, y: 200},
    data: {label: '0'},
    style: {
      display: 'flex',
      width: 150,
      height: 80,
      border: '1px solid #000',
    },
  },
  {
    id: '1',
    type: 'input',
    parentNode: '0',
    extent: 'parent',
    position: {x: 0, y: 0},
    data: {label: '1'},
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: '2',
    type: 'input',
    parentNode: '0',
    extent: 'parent',
    position: {x: 0, y: 40},
    data: {label: '2'},
    sourcePosition: 'right',
    targetPosition: 'left',
  },

  {
    id: '3',
    position: {x: 400, y: 400},
    data: {label: '3'},
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: '4',
    position: {x: 100, y: 200},
    data: {label: '4'},
    sourcePosition: 'right',
    targetPosition: 'left',
    content: [
      {id: 'test', data: {label: 'hello'}, x: 0, y: 0},
      {id: 'test2', data: {label: 'world'}, x: 0, y: 0},
    ],
  },
];
const initialEdges = [
  {id: 'e1-2', source: '1', target: '2', animated: true},
  {id: 'e2-3', source: '2', target: '3', animated: true},
];
*/
