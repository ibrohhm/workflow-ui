"use client"

import { useCallback } from 'react';
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Node,
  type Edge,
} from '@xyflow/react';
import { StartNode } from './nodes/start-node';
import { EndNode } from './nodes/end-node';
import { TaskNode } from './nodes/task-node';
import { GatewayNode } from './nodes/gateway-node';
import { TextNode } from './nodes/text-node';
import { CardNode } from './nodes/card-node';
import simpleFlow from '../data/simple-flow.json';
import requestApprovalFlow from '../data/request-approval-flow.json';

const nodeTypes = {
  start: StartNode,
  end: EndNode,
  task: TaskNode,
  gateway: GatewayNode,
  text: TextNode,
  card: CardNode,
}

const initialNodes = requestApprovalFlow.nodes as Node[]
const initialEdges = requestApprovalFlow.edges as Edge[]

export function WorkflowUI() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <div className="wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        colorMode="system"
      >
        <Background />
      </ReactFlow>
    </div>
  )
}
