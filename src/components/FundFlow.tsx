"use client";
import { useState, useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface Flow {
  from: string;
  to: string;
  token: string;
  tokenName: string;
  amount: number;
}

export function buildNodes(flows: Flow[]) {
  return flows.map((flow) => ({
    id: flow.from,
    data: { label: flow.from },
    position: { x: 0, y: 0 },
    type: "input",
  }));
}

export function buildEdges(flows: Flow[]) {
  return flows.map((flow) => ({
    id: `${flow.from}-${flow.to}`,
    source: flow.from,
    target: flow.to,
    label: `${flow.amount} ${flow.tokenName}`,
    type: "step",
  }));
}

interface FundFlowProps {
  flows: Flow[]
}

// const initialNodes = [
//   {
//     id: "1",
//     data: { label: "Hello" },
//     position: { x: 0, y: 0 },
//     type: "input",
//   },
//   {
//     id: "2",
//     data: { label: "World" },
//     position: { x: 100, y: 100 },
//   },
// ];

export default function FundFlow({flows}: FundFlowProps) {
  console.log(flows);
  const initialNodes = buildNodes(flows)
  const initialEdges = buildEdges(initialNodes);
  const [nodes, setNodes] = useState(flows);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <div style={{ height: "200px" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
