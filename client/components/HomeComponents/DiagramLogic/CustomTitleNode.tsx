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

function CustomTitleNode({ data, isConnectable }: any) {
  const onChange = useCallback((evt: any) => {
    // console.log(evt.target.value);
  }, []);

  return (
    <div className="column-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={handleStyleLeft}
      />
      <div>
        <label>
          <strong>{data.label}</strong>
        </label>
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

export default CustomTitleNode;
