"use client"

import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import {
  Background,
  ReactFlow,
  Panel,
  useViewport,
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
import { ContainerNode } from './nodes/container-node';
import { ArcEdge } from './edges/arc-edge';
import { PropertiesSidebar } from './properties-sidebar';
import { ShapesToolbar } from './shapes-toolbar';
import { saveCanvas, loadCanvas, serializeCanvas } from '@/lib/canvas-storage';

function ZoomIndicator() {
  const { zoom } = useViewport();
  return (
    <Panel position="bottom-center">
      <span className="text-[10px] font-mono select-none"
        style={{ color: 'oklch(0.75 0.01 265)' }}>
        - {Math.round(zoom * 100)}% -
      </span>
    </Panel>
  );
}

const nodeTypes = {
  circle: CircleNode,
  task: TaskNode,
  diamond: DiamondNode,
  text: TextNode,
  card: CardNode,
  container: ContainerNode,
}

const edgeTypes = {
  arc: ArcEdge,
}


export function WorkflowUI() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [flows, setFlows] = useState<string[]>([]);
  const [currentFlow, setCurrentFlow] = useState<string | null>(null);

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

  const onNodeClick = useCallback((e: React.MouseEvent, node: Node) => {
    if (e.shiftKey) return;
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

  const onNodeDragStop = useCallback((_: unknown, draggedNode: Node) => {
    if (draggedNode.type === 'container') return;

    setNodes(nds => {
      const fresh = nds.find(n => n.id === draggedNode.id);
      if (!fresh) return nds;

      const currentParent = fresh.parentId ? nds.find(n => n.id === fresh.parentId) : null;
      const absX = fresh.position.x + (currentParent?.position.x ?? 0);
      const absY = fresh.position.y + (currentParent?.position.y ?? 0);

      const nw = (fresh.measured?.width  ?? fresh.width  as number ?? 100);
      const nh = (fresh.measured?.height ?? fresh.height as number ?? 50);
      const cx = absX + nw / 2;
      const cy = absY + nh / 2;

      const target = nds.find(n => {
        if (n.type !== 'container') return false;
        const cw = n.measured?.width  ?? n.width  as number ?? 0;
        const ch = n.measured?.height ?? n.height as number ?? 0;
        return cx >= n.position.x && cx <= n.position.x + cw
            && cy >= n.position.y && cy <= n.position.y + ch;
      });

      const newParentId = target?.id;
      if (newParentId === fresh.parentId) return nds;

      const newPos = target
        ? { x: absX - target.position.x, y: absY - target.position.y }
        : { x: absX, y: absY };

      const updated: Node = { ...fresh, position: newPos, parentId: newParentId };
      const rest = nds.filter(n => n.id !== fresh.id);

      if (newParentId) {
        const idx = rest.findIndex(n => n.id === newParentId);
        return [...rest.slice(0, idx + 1), updated, ...rest.slice(idx + 1)];
      }
      return [...rest, { ...updated, parentId: undefined }];
    });
  }, [setNodes]);

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

  const loadFlow = useCallback(async (name: string) => {
    const res = await fetch(`/api/v1/flows/${name}`);
    if (!res.ok) return;
    const data = await res.json();
    setNodes(data.nodes ?? []);
    setEdges(data.edges ?? []);
    setCurrentFlow(name);
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  }, [setNodes, setEdges]);

  const loadWelcome = useCallback(() => {
    fetch('/api/v1/flows/welcome-flow')
      .then(r => r.json())
      .then(data => {
        setNodes(data.nodes ?? []);
        setEdges(data.edges ?? []);
      });
  }, [setNodes, setEdges]);

  useEffect(() => {
    fetch('/api/v1/flows')
      .then(r => r.json())
      .then((names: string[]) => {
        setFlows(names.filter(n => n !== 'welcome-flow'));
        const initial = process.env.NEXT_PUBLIC_INITIAL_FLOW;
        if (initial && names.includes(initial)) {
          loadFlow(initial);
        } else if (process.env.NEXT_PUBLIC_AUTOSAVE === 'true') {
          const saved = loadCanvas();
          if (saved) {
            setNodes(saved.nodes);
            setEdges(saved.edges);
          } else {
            loadWelcome();
          }
        } else {
          loadWelcome();
        }
      });
  }, [loadFlow, loadWelcome, setNodes, setEdges]);

  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_AUTOSAVE !== 'true') return;
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => saveCanvas(nodes, edges), 600);
    return () => { if (autosaveTimer.current) clearTimeout(autosaveTimer.current); };
  }, [nodes, edges]);

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
      card:      { title: 'Card', content: '' },
      container: { label: '', color: 'purple' },
    };
    const sizes: Record<string, { width: number; height: number }> = {
      container: { width: 320, height: 200 },
    };
    const newNode: Node = {
      id: `node_${Date.now()}`,
      type,
      position,
      data: defaults[type] ?? { label: type },
      ...sizes[type],
    };
    setNodes(nds => [...nds, newNode]);
  }, [setNodes]);

  const [copyLabel, setCopyLabel] = useState('Copy JSON');
  const [showGrid, setShowGrid] = useState(true);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopySchema = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(serializeCanvas(nodes, edges), null, 2));
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
        onNodeDragStop={onNodeDragStop}
        onInit={(instance) => { rfInstance.current = instance; }}
        onDragOver={onDragOver}
        onDrop={onDrop}
        defaultEdgeOptions={{ reconnectable: true }}
        minZoom={Number(process.env.NEXT_PUBLIC_MIN_ZOOM ?? 0.3)}
        maxZoom={Number(process.env.NEXT_PUBLIC_MAX_ZOOM ?? 1.5)}
        selectionOnDrag
        // defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        colorMode={(process.env.NEXT_PUBLIC_COLOR_MODE as 'system' | 'light' | 'dark') ?? 'system'}
      >
        {showGrid && <Background />}
        {process.env.NEXT_PUBLIC_SHOW_ZOOM_INDICATOR === 'true' && <ZoomIndicator />}
      </ReactFlow>
      {process.env.NEXT_PUBLIC_SHOW_COPY_JSON === 'true' && (
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
      )}
      <ShapesToolbar
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(v => !v)}
        flows={flows}
        currentFlow={currentFlow}
        onFlowChange={loadFlow}
      />
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
