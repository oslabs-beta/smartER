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
import { render } from '@testing-library/react';

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
    renderedData,
    setRenderedData,
    renderedDataPositions,
    setRenderedDataPositions,
    errorMessages,
    setErrorMessages,
    queryResponse,
    setQueryResponse,
  } = useContext(HomepageContext)!;

  async function getQueryResults() {
    //setSubmit to trigger useEffect for re-rendering Diagram.tsx
    // POST request to database with queryString
    try {
      const created_at = String(Date.now());
      const data = await fetch('/api/getQueryResults', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ created_at, queryString }),
      });
      if (data.status === 200) {
        const parsedData = await data.json();
        //setState query result for rendering QueryResults.tsx
        setQueryResponse(parsedData);
      } else {
        // errorList();
      }
      //Update History State, for re-rendering History.tsx
      // setHistory((prev: any) => {
      //   console.log('IN QUERY SUBMIT history: ', history);
      //   prev.push({ created_at, query: queryString });
      //   return prev;
      // });
    } catch (error) {
      console.log(`Error in QueryInput.tsx ${error}`);
      return `Error in QueryInput.tsx ${error}`;
    }
  }
  // HOOKS
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeDragStop = (e, node: any) => {
    console.log(e, node);
    setRenderedDataPositions([...renderedDataPositions, node]);
  };

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
        const queryParse = conditionalSchemaParser(
          queryString,
          masterData
        ).mainObj;
        console.log('new', queryParse, 'old', renderedData);
        const errorArr = queryParse.errorArr;
        setErrorMessages(errorArr);
        if (!errorArr[0]) getQueryResults();

        const defaultNodes = parseNodes(queryParse);
        const defaultEdges = parseEdges(queryParse);

        console.log(defaultNodes);

        // if (JSON.stringify(renderedData) === JSON.stringify({})) {
        //   console.log('run elk');
        const testElk = await getElkData(
          defaultNodes,
          defaultEdges,
          renderedDataPositions
        );

        setNodes(testElk);
        setRenderedDataPositions(testElk);
        // } else {
        // }
        // setNodes(defaultNodes);
        setEdges(defaultEdges);
        setRenderedData(queryParse);
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
          onNodeDragStop={onNodeDragStop}
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
