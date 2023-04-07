import React, { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyleLeft = {
  opacity: '0',
  marginLeft: '5px',
};
const handleStyleRight = {
  opacity: '0',
  marginRight: '5px',
};

function CustomColumnNode({ data, isConnectable }: any) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="column-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={handleStyleLeft}
      />
      <div className="column-container">
        <div className="column-icon">{data.icon}</div>
        <div className="column-data">
          <div className="column-name">{data.columnName}</div>
          <div className="column-type">{data.dataType}</div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={handleStyleRight}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CustomColumnNode;
