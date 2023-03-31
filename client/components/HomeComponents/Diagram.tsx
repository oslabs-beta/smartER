import { FC, useContext, useCallback, useEffect } from 'react';
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

const nodeTypes = {
  CustomColumnNode: CustomColumnNode,
  CustomTitleNode: CustomTitleNode,
};

const Diagram: FC<{}> = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { queryString, submit, masterData, setMasterData } =
    useContext(HomepageContext)!;

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
      const queryParse = conditionalSchemaParser(
        queryString,
        masterData
      ).mainObj;
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
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default Diagram;
