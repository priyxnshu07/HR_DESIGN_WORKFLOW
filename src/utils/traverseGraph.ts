import type { WFEdge } from '../types/workflow';
import type { WFNode } from '../types/nodes';

export function buildAdjacency(edges: WFEdge[]): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  for (const edge of edges) {
    if (!adj.has(edge.source)) adj.set(edge.source, []);
    adj.get(edge.source)!.push(edge.target);
  }
  return adj;
}

export function bfsOrder(nodes: WFNode[], edges: WFEdge[]): string[] {
  const startNode = nodes.find(n => n.type === 'start');
  if (!startNode) return [];

  const adj = buildAdjacency(edges);
  const queue = [startNode.id];
  const visited = new Set<string>([startNode.id]);
  const result: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);

    const neighbors = adj.get(current) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}

export function hasCycle(nodes: WFNode[], edges: WFEdge[]): boolean {
  const adj = buildAdjacency(edges);
  const visited = new Set<string>();
  const recStack = new Set<string>();

  function dfs(nodeId: string): boolean {
    if (recStack.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;

    visited.add(nodeId);
    recStack.add(nodeId);

    const neighbors = adj.get(nodeId) || [];
    for (const next of neighbors) {
      if (dfs(next)) return true;
    }

    recStack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) return true;
    }
  }

  return false;
}
