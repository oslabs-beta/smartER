import React, { FC, useContext, useState, useCallback, useEffect } from 'react';
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
import { HomepageContext } from '../../Context';
import {
  // testnodes,
  // testEdges,
  parseEdges,
  parseNodes,
} from './DiagramLogic/ParseNodes';
import { Statement, astVisitor, parseFirst } from 'pgsql-ast-parser';

// import { parseQueryAndGenerateNodes } from './DiagramLogic/SampleData';
import CustomColumnNode from './DiagramLogic/CustomColumnNode';
import CustomTitleNode from './DiagramLogic/CustomTitleNode';
import mainFunc from './DiagramLogic/ConditionalRender';

const nodeTypes = {
  CustomColumnNode: CustomColumnNode,
  CustomTitleNode: CustomTitleNode,
};

// Test Query
// const query = `
// SELECT p.*, s._id, h.name, people.name
// FROM people p
// LEFT JOIN species s ON p.species_id = s._id
// LEFT JOIN planets h ON p.homeworld_id = h._id`;
/*
SELECT s._id, h.name, p.name
FROM people p
LEFT JOIN species s ON p.species_id = s._id
LEFT JOIN planets h ON p.homeworld_id = h._id;
*/

// const query = `select name from people as p
// left join species s on s._id = p.species_id`;

// const ast: Statement = parseFirst(query);
// // console.log('AST:', ast);
// mainFunc(query);
const tables = new Set();
let joins = 0;
const query = `select concat(name, mass) test from people`;

console.log(parseFirst(query));
var currentTable: any;
const visitor = astVisitor((map) => ({
  // implement here AST parts you want to hook
  selectionColumn: (z) => {
    console.log('selectionColumn', currentTable, z);
  },
  tableRef: (t) => {
    currentTable = t.name;
    tables.add(t.name);
    console.log('tableRef:', t);
  },
  join: (t) => {
    console.log('join', t);
    joins++;
    // call the default implementation of 'join'
    // this will ensure that the subtree is also traversed.
    map.super().join(t);
  },
  call: (t) => {
    console.log('call', t);
  },
  select: (val) => {
    console.log('select', val);
  },
  // Overwrites anything from tableRef or selectionColumn
  // union: (s) => {
  //   console.log('union', s);
  // },
}));

visitor.statement(parseFirst(query));
console.log('tables:', tables);
const Diagram: React.FC<{}> = () => {
  // const data = await getERDiagram()
  const [nodes, setNodes, onNodesChange] = useNodesState([]); //testnodes
  const [edges, setEdges, onEdgesChange] = useEdgesState([]); //testEdges
  const { queryString, submit } = useContext(HomepageContext)!;
  const [masterData, setMasterData] = useState({});

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const getERDiagram = async () => {
    try {
      const data = await fetch('/api/getSchema', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const parsedData = await data.json();
      setMasterData(parsedData);
      return;
    } catch (error) {
      console.log(`Error in getERDiagram: ${error}`);
    }
  };

  useEffect(() => {
    getERDiagram();
  }, []);

  useEffect(() => {
    if (queryString) {
      const queryParse = mainFunc(queryString).mainObj;
      const defaultNodes = parseNodes(queryParse);
      const defaultEdges = parseEdges(queryParse);
      setNodes(defaultNodes);
      setEdges(defaultEdges);
    }
  }, [submit]);

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
          nodeTypes={nodeTypes}
        >
          <Controls />
          {/* <MiniMap /> */}
          <Background gap={12} size={1} />
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
