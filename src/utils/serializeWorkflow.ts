import type { Workflow, WFEdge } from '../types/workflow';
import type { Node, Edge } from '@xyflow/react';
import type { NodeType, BaseNodeData, WFNode } from '../types/nodes';

export function serializeWorkflow(id: string, name: string, nodes: Node[], edges: Edge[]): Workflow {
  // Strip out React Flow internals from nodes
  const cleanNodes: WFNode[] = nodes.map(n => ({
    id: n.id,
    type: (n.type as NodeType) || 'task',
    position: { x: n.position.x, y: n.position.y },
    data: n.data as unknown as BaseNodeData
  }));

  const cleanEdges: WFEdge[] = edges.map(e => ({
    id: e.id,
    source: e.source,
    target: e.target,
    label: (e.label as string) || undefined
  }));

  return {
    id,
    name,
    nodes: cleanNodes,
    edges: cleanEdges
  };
}
