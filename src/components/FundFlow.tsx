"use client";
import {
  ReactFlow,
  Controls,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { initialNodes, initialEdges } from './nodes-edges.js';



interface Flow {
  from: string;
  to: string;
  token: string;
  tokenName: string;
  amount: number;
}

export function buildNodes(flows: Flow[]) {
  let i = 0;
  const nodes = flows.map((flow) => ({
    id: flow.from,
    data: { label: flow.from },
    position: { x: (i++) * 200, y: 0 },
    sourcePosition: "right",
    targetPosition: "left",
  }));

  const lastFlow = flows[flows.length - 1];
  const endNode = {
    id: lastFlow.to,
    data: { label: lastFlow.to },
    position: { x: i * 200, y: 0 },
    sourcePosition: "right",
    targetPosition: "left",
  }
  if (nodes[0].id !== endNode.id) {
    nodes.push(endNode)
  }
  return nodes
}

// const flows = [
//   {
//     from: "A",
//     to: "B",
//     amount: 100,
//     tokenName: 'USDT',
//     token: '0xusdt'
//   },
//   {
//     from: "B",
//     to: "A",
//     amount: 9,
//     tokenName: 'USDT',
//     token: '0xusdt'
//   },
// ];


export function buildEdges(flows: Flow[]) {
  return flows.map((flow) => ({
    id: `${flow.from}-${flow.to}`,
    source: flow.from,
    target: flow.to,
    label: `${flow.amount} ${flow.tokenName}`,
    animated: true,
    style: { stroke: "red" },
  }))
}
// interface FundFlowProps {
//   flows: Flow[]
// }


export default function FundFlow() {
  const nodes = initialNodes
  const edges = initialEdges;
  console.log('节点', nodes)
  console.log('边界', edges)

  return (
    <div style={{ height: "500px", width: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
