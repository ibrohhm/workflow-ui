"use client"

import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  reconnectEdge,
  type Connection,
  type Node,
  type Edge,
  type EdgeMarker,
  type ReactFlowInstance,
} from '@xyflow/react';
import { CircleNode } from './nodes/circle-node';
import { TaskNode } from './nodes/task-node';
import { DiamondNode } from './nodes/diamond-node';
import { TextNode } from './nodes/text-node';
import { CardNode } from './nodes/card-node';
import { BidirEdge } from './edges/arc-edge';
import { PropertiesSidebar } from './properties-sidebar';
import { ShapesToolbar } from './shapes-toolbar';
import simpleFlow from '../data/simple-flow.json';
import agentTeamFlow from '../data/agent-team-flow.json';
import requestApprovalFlow from '../data/request-approval-flow.json';

const nodeTypes = {
  circle: CircleNode,
  task: TaskNode,
  diamond: DiamondNode,
  text: TextNode,
  card: CardNode,
}

const edgeTypes = {
  arc: BidirEdge,
}

const initialNodes = agentTeamFlow.nodes as Node[]
const initialEdges = agentTeamFlow.edges as Edge[]

export function WorkflowUI() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

  const selectedNode = selectedNodeId ? (nodes.find(n => n.id === selectedNodeId) ?? null) : null;
  const selectedEdge = selectedEdgeId ? (edges.find(e => e.id === selectedEdgeId) ?? null) : null;

  const displayEdges = useMemo(
    () =>
      edges.map(e => {
        if (!e.markerEnd || typeof e.markerEnd === 'string') return e;
        const color = e.id === selectedEdgeId ? 'oklch(0.439 0 0)' : 'oklch(0.556 0 0)';
        return { ...e, markerEnd: { ...(e.markerEnd as EdgeMarker), color } };
      }),
    [edges, selectedEdgeId],
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      setEdges((eds) => reconnectEdge(oldEdge, newConnection, eds)),
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

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        if (!selectedNode) return;
        const newNode: Node = {
          ...selectedNode,
          id: `node_${Date.now()}`,
          position: { x: selectedNode.position.x + 20, y: selectedNode.position.y + 20 },
          selected: false,
        };
        setNodes(nds => [...nds, newNode]);
        setSelectedNodeId(newNode.id);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedNode, setNodes]);

  const rfInstance = useRef<ReactFlowInstance | null>(null);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('application/reactflow');
    if (!type || !rfInstance.current) return;

    const position = rfInstance.current.screenToFlowPosition({ x: e.clientX, y: e.clientY });
    const defaults: Record<string, Record<string, unknown>> = {
      circle:  { label: 'Event' },
      task:    { label: 'Task' },
      diamond: { label: 'Gateway', background: 'yellow' },
      text:    { label: 'Text', color: 'yellow' },
      card:    { title: 'Card', content: '' },
    };
    const newNode: Node = {
      id: `node_${Date.now()}`,
      type,
      position,
      data: defaults[type] ?? { label: type },
    };
    setNodes(nds => [...nds, newNode]);
  }, [setNodes]);

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
        edges={displayEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onReconnect={onReconnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        onInit={(instance) => { rfInstance.current = instance; }}
        onDragOver={onDragOver}
        onDrop={onDrop}
        defaultEdgeOptions={{ reconnectable: true }}
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
      <ShapesToolbar />
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
