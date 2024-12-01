'use client';

import ReactFlow, { 
    Node, 
    Edge,
    Position,
    MarkerType,
    Background,
    Controls
  } from 'reactflow';
  import 'reactflow/dist/style.css';
  
  interface Token {
    address: string;
    symbol: string;
  }
  
  interface Transfer {
    from: string;
    to: string;
    amount: string;
    token: Token;
  }
  
  interface FundFlowProps {
    transfers: Transfer[];
  }
  
  const COLORS = [
    '#2563eb', // 蓝色
    '#10b981', // 绿色
    '#8b5cf6', // 紫色
    '#f59e0b', // 橙色
    '#ef4444', // 红色
  ];
  
  // 自定义节点样式
  const nodeStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    width: 180,
  };
  
  export default function FundFlow({ transfers }: FundFlowProps) {
    const uniqueAddresses = Array.from(new Set([
      ...transfers.map(t => t.from),
      ...transfers.map(t => t.to)
    ]));
  
    // 使用圆形布局，但调整起始角度
    const radius = 200;
    const startAngle = -Math.PI / 2; // 从顶部开始
    const nodes: Node[] = uniqueAddresses.map((addr, index) => {
      const angle = startAngle + (index * 2 * Math.PI) / uniqueAddresses.length;
      return {
        id: addr,
        position: {
          x: 300 + radius * Math.cos(angle),
          y: 200 + radius * Math.sin(angle)
        },
        data: { label: addr },
        style: nodeStyle,
      };
    });
  
    // 计算节点位置的映射
    const nodePositions = Object.fromEntries(
      nodes.map(node => [node.id, node.position])
    );
  
    // 修改边的创建逻辑
    const edges: Edge[] = transfers.map((transfer, index) => {
      const sourcePos = nodePositions[transfer.from];
      const targetPos = nodePositions[transfer.to];
      
      // 计算两点之间的角度
      const angle = Math.atan2(
        targetPos.y - sourcePos.y,
        targetPos.x - sourcePos.x
      );

      return {
        id: `edge-${index}`,
        source: transfer.from,
        target: transfer.to,
        label: `${transfer.amount} ${transfer.token.symbol}`,
        type: 'bezier',
        animated: true,
        style: { 
          stroke: COLORS[index % COLORS.length],
          strokeWidth: 2,
        },
        labelStyle: { 
          fill: COLORS[index % COLORS.length], 
          fontWeight: 500,
          fontSize: 12,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: COLORS[index % COLORS.length],
          width: 20,
          height: 20,
        },
        // 根据角度动态设置连接点
        sourceHandle: undefined,
        targetHandle: undefined,
      };
    });
  
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">资金流向</h2>
        <div style={{ height: Math.max(400, (nodes.length * 100)) }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            attributionPosition="bottom-left"
            defaultEdgeOptions={{
              type: 'bezier',
              animated: true,
            }}
            fitViewOptions={{
              padding: 0.2,
              minZoom: 0.5,
              maxZoom: 2,
            }}
          >
            <Background />
            <Controls />
          </ReactFlow>
  
          {/* 图例 */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4 bg-white p-2 rounded-lg shadow-sm">
            {transfers.map((transfer, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-4 h-0.5" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm text-gray-600">{transfer.token.symbol}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }