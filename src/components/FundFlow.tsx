"use client";
import { ReactFlow, Controls, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from './CustomNode';
import { buildTrees, convertToEdges, Flow } from "@/util/flow";

interface FundFlowProps {
  flows: Flow[]
}

export default function FundFlow({ flows }: FundFlowProps) {
  const nodes = buildTrees(flows);
  const edges = convertToEdges(flows);
  console.log("节点", nodes);
  console.log("边界", edges);
  const nodeTypes = {
    custom: CustomNode,
  };

  return (
    <div style={{ height: "500px", width: "800px" }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} nodesDraggable={true}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
