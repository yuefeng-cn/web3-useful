export interface Flow {
    from: string;
    to: string;
    token: string;
    tokenName: string;
    amount: number;
}

export interface TreeNode {
    id: string;
    data: { label: string };
    position: { x: number; y: number };
    children?: TreeNode[];
}

export interface FlatNode {
    id: string;
    data: { label: string };
    type: 'custom';
    position: { x: number; y: number };
}
export interface Edge {
    id: string;
    source: string;
    target: string;
    animated: boolean;
}

export function buildTrees(flows: Flow[]): FlatNode[] {
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, degree]) => degree === 0)
        .map(([node]) => node);

    // 从每个根节点开始构建树
    let currentRootX = -200;

    roots.forEach(rootId => {
        const root: TreeNode = {
            id: rootId,
            data: { label: rootId },
            position: { x: currentRootX, y: 100 },
            children: []
        };
        nodeMap.set(rootId, root);
        currentRootX += 400; // 下一个树的根节点x坐标
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
                    x: parentNode.position.x + (parentNode.children?.length || 0) * 450,
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
            position: node.position,
            type: 'custom'
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



export function convertToEdges(flows: Flow[]): Edge[] {
    return flows.map(flow => ({
        id: `${flow.from}-${flow.to}`,
        source: flow.from,
        target: flow.to,
        label: `${flow.amount} ${flow.tokenName}`,
        animated: true
    }));
}

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