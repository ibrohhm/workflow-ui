"use client"

import { useCallback, useState, useRef } from 'react';
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
import { PropertiesSidebar } from './properties-sidebar';
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
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

  const selectedNode = selectedNodeId ? (nodes.find(n => n.id === selectedNodeId) ?? null) : null;
  const selectedEdge = selectedEdgeId ? (edges.find(e => e.id === selectedEdgeId) ?? null) : null;

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
    setSelectedEdgeId(null);
  }, []);

  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setSelectedEdgeId(edge.id);
    setSelectedNodeId(null);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  }, []);

  const handleNodeDataChange = useCallback(
    (nodeId: string, updates: Record<string, unknown>) => {
      setNodes(nds =>
        nds.map(n => (n.id === nodeId ? { ...n, data: { ...n.data, ...updates } } : n)),
      );
    },
    [setNodes],
  );

  const handleEdgeChange = useCallback(
    (edgeId: string, updates: Partial<Edge>) => {
      setEdges(eds => eds.map(e => (e.id === edgeId ? { ...e, ...updates } : e)));
    },
    [setEdges],
  );

  const handleSidebarClose = useCallback(() => {
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  }, []);

  const [copyLabel, setCopyLabel] = useState('Copy JSON');
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopySchema = useCallback(() => {
    const schema = {
      nodes: nodes.map(({ id, type, data, position, width, height, style }) => ({
        id, type, data, position,
        ...(width  != null ? { width }  : style?.width  != null ? { width:  style.width  } : {}),
        ...(height != null ? { height } : style?.height != null ? { height: style.height } : {}),
      })),
      edges: edges.map(({ id, source, target, sourceHandle, targetHandle, type, label, animated, style, markerEnd, markerStart }) => ({
        id, source, target,
        ...(sourceHandle != null ? { sourceHandle } : {}),
        ...(targetHandle != null ? { targetHandle } : {}),
        ...(type        != null ? { type }        : {}),
        ...(label       != null ? { label }       : {}),
        ...(animated    != null ? { animated }    : {}),
        ...(style       != null ? { style }       : {}),
        ...(markerEnd   != null ? { markerEnd }   : {}),
        ...(markerStart != null ? { markerStart } : {}),
      })),
    };
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
    setCopyLabel('Copied!');
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyLabel('Copy JSON'), 2000);
  }, [nodes, edges]);

  return (
    <div className="wrapper relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        colorMode="system"
      >
        <Background />
      </ReactFlow>
      <button
        onClick={handleCopySchema}
        className="fixed bottom-4 right-4 z-20 text-[11px] font-medium px-3 py-1.5 rounded-lg transition-colors duration-150"
        style={{
          backgroundColor: 'oklch(0.16 0.01 265)',
          color: 'oklch(0.97 0.003 265)',
          boxShadow: '0 2px 8px oklch(0.15 0.02 265 / 0.2)',
        }}
      >
        {copyLabel}
      </button>
      <PropertiesSidebar
        selectedNode={selectedNode}
        selectedEdge={selectedEdge}
        onNodeDataChange={handleNodeDataChange}
        onEdgeChange={handleEdgeChange}
        onClose={handleSidebarClose}
      />
    </div>
  )
}
