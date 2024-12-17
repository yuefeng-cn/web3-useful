import React from 'react';
import { Handle, Position } from '@xyflow/react';

const CustomNode = ({ data }) => {
    return (
        <div style={{ border: '2px solid blue', padding: '10px', borderRadius: '5px', width: '410px', height: '50px' }}>
            <Handle type="target" position={Position.Top} />
            <div>{data.label}</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};


export default CustomNode;