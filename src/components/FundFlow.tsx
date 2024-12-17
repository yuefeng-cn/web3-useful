"use client";
import { ReactFlow, Controls, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { initialNodes, initialEdges } from "./nodes-edges.js";

interface Flow {
  from: string;
  to: string;
  token: string;
  tokenName: string;
  amount: number;
}

// 示例数据
const flows: Flow[] = [
  {
    from: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    to: "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE",
    amount: 5000000000000000,
    tokenName: "WBNB",
    token: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
  },
  {
    from: "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE",
    to: "0xc5a202d380028eC0dE708a09299D30342C73fDE7",
    amount: 3572506953399170195,
    tokenName: "USDT",
    token: "0x55d398326f99059ff775485246999027b3197955",
  },
  {
    from: "0xc5a202d380028eC0dE708a09299D30342C73fDE7",
    to: "0x755223e5113F5d5041722ea2FB2082DC46832025",
    amount: 16037984720716503605,
    tokenName: "GS",
    token: "0x755223e5113f5d5041722ea2fb2082dc46832025",
  },
  {
    from: "0xc5a202d380028eC0dE708a09299D30342C73fDE7",
    to: "0x000000000000000000000000000000000000dEaD",
    amount: 1924558166485980432,
    tokenName: "GS",
    token: "0x755223e5113f5d5041722ea2fb2082dc46832025",
  },
  {
    from: "0xc5a202d380028eC0dE708a09299D30342C73fDE7",
    to: "0xD8Db782c4A3ffCb14e4928f43f01F3bC3FBe2AB0",
    amount: 302797151527127588078,
    tokenName: "GS",
    token: "0x755223e5113f5d5041722ea2fb2082dc46832025",
  },
];


interface TreeNode {
  id: string;
  data: { label: string };
  position: { x: number; y: number };
  children?: TreeNode[];
}

interface FlatNode {
  id: string;
  data: { label: string };
  position: { x: number; y: number };
}

function buildTrees(flows: Flow[]): FlatNode[] {
  // 存储所有节点的映射，方便查找
  const nodeMap = new Map<string, TreeNode>();
  // 存储入度，用于找到根节点
  const inDegree = new Map<string, number>();

  // 初始化入度统计
  flows.forEach(flow => {
    inDegree.set(flow.from, (inDegree.get(flow.from) || 0));
    inDegree.set(flow.to, (inDegree.get(flow.to) || 0) + 1);
  });

  // 找到所有根节点（入度为0的节点）
  const roots: string[] = Array.from(inDegree.entries())
    .filter(([_, degree]) => degree === 0)
    .map(([node]) => node);

  // 从每个根节点开始构建树
  let currentRootX = 100;

  roots.forEach(rootId => {
    const root: TreeNode = {
      id: rootId,
      data: { label: rootId },
      position: { x: currentRootX, y: 100 },
      children: []
    };
    nodeMap.set(rootId, root);
    currentRootX += 200; // 下一个树的根节点x坐标
  });

  // 构建树的边
  flows.forEach(flow => {
    let parentNode = nodeMap.get(flow.from);
    if (!parentNode) {
      parentNode = {
        id: flow.from,
        data: { label: flow.from },
        position: { x: 0, y: 0 }, // 临时坐标
        children: []
      };
      nodeMap.set(flow.from, parentNode);
    }

    let childNode = nodeMap.get(flow.to);
    if (!childNode) {
      childNode = {
        id: flow.to,
        data: { label: flow.to },
        position: {
          x: parentNode.position.x + (parentNode.children?.length || 0) * 100,
          y: parentNode.position.y + 100
        },
        children: []
      };
      nodeMap.set(flow.to, childNode);
    }

    parentNode.children = parentNode.children || [];
    parentNode.children.push(childNode);
  });

  // 将树形结构展平为节点数组
  const result: FlatNode[] = [];

  function flattenTree(node: TreeNode) {
    result.push({
      id: node.id,
      data: node.data,
      position: node.position
    });

    node.children?.forEach(child => flattenTree(child));
  }

  roots.forEach(rootId => {
    const root = nodeMap.get(rootId);
    if (root) {
      flattenTree(root);
    }
  });

  return result;
}

const flatNodes = buildTrees(flows);
console.log("扁平化节点", flatNodes);

export function buildNodes(flows: Flow[]) {
  const source = new Map<string, string>();
  for (const flow of flows) {
    source.set(flow.to, flow.from);
  }

  const headNodes: string[] = [];
  for (const flow of flows) {
    if (!source.has(flow.from)) {
      headNodes.push(flow.from);
    }
  }
  let i = 0;
  const nodes = flows.map((flow) => ({
    id: flow.from,
    data: { label: flow.from },
    position: { x: i++ * 200, y: 0 },
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
  };
  if (nodes[0].id !== endNode.id) {
    nodes.push(endNode);
  }
  return nodes;
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
  }));
}
// interface FundFlowProps {
//   flows: Flow[]
// }

export default function FundFlow() {
  const nodes = buildTrees(flows);
  const edges = initialEdges;
  console.log("节点", nodes);
  console.log("边界", edges);

  return (
    <div style={{ height: "500px", width: "600px" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
