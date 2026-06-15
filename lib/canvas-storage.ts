import pako from 'pako';
import type { Node, Edge } from '@xyflow/react';

const KEY = 'workflow-ui:canvas';

export function serializeCanvas(nodes: Node[], edges: Edge[]) {
  return {
    nodes: nodes.map(({ id, type, data, position, width, height, style, parentId }) => ({
      id, type, data, position,
      ...(parentId != null ? { parentId } : {}),
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
}

export function saveCanvas(nodes: Node[], edges: Edge[]) {
  try {
    const compressed = pako.deflate(JSON.stringify(serializeCanvas(nodes, edges)));
    const b64 = btoa(String.fromCharCode(...compressed));
    localStorage.setItem(KEY, b64);
  } catch {}
}

export function loadCanvas(): { nodes: Node[]; edges: Edge[] } | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const binary = atob(raw);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return JSON.parse(pako.inflate(bytes, { to: 'string' }));
  } catch {
    return null;
  }
}

export function clearCanvas() {
  localStorage.removeItem(KEY);
}
