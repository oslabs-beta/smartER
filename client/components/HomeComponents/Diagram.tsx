import React, { FC, useContext, useCallback, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { HomepageContext } from '../../Context';
import { parseEdges, parseNodes } from './DiagramLogic/ParseNodes';
import CustomColumnNode from './DiagramLogic/CustomColumnNode';
import CustomTitleNode from './DiagramLogic/CustomTitleNode';
import conditionalSchemaParser from './DiagramLogic/ConditionalSchemaParser';
import { getElkData } from './DiagramLogic/LayoutCalc';

const proOptions = { hideAttribution: true };
const nodeTypes = {
  CustomColumnNode: CustomColumnNode,
  CustomTitleNode: CustomTitleNode,
};

const fitViewOptions = {
  padding: 10,
};

const Diagram: FC<{}> = () => {
  // STATE
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const {
    queryString,
    submit,
    masterData,
    setMasterData,
    errorMessages,
    setErrorMessages,
  } = useContext(HomepageContext)!;

  // HOOKS
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
      async function updateNodes() {
        setErrorMessages(['']);
        const queryParse = conditionalSchemaParser(queryString, masterData);
        console.log('queryParse: ', queryParse);
        const errorArr = queryParse.errorArr;
        setErrorMessages(errorArr);
        const defaultNodes = parseNodes(queryParse.mainObj);
        const defaultEdges = parseEdges(queryParse.mainObj);
        const testElk = await getElkData(defaultNodes, defaultEdges);
        setNodes(testElk);
        setEdges(defaultEdges);
      }
      updateNodes();
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
          fitView={true}
          proOptions={proOptions}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default Diagram;
