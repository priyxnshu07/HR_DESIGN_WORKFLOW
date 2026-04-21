import type { Workflow } from '../../types/workflow';
import type { WFNode } from '../../types/nodes';
import type { SimResult, SimStep } from '../../types/api';

export function simulateMock(workflow: Workflow): SimResult {
  const startNode = workflow.nodes.find((n: WFNode) => n.type === 'start');
  if (!startNode) {
    return {
      success: false,
      steps: [],
      errors: ['No start node found in workflow.']
    };
  }

  const steps: SimStep[] = [];
  const queue: WFNode[] = [startNode];
  const visited = new Set<string>();
  visited.add(startNode.id);

  while (queue.length > 0) {
    const current = queue.shift()!;
    steps.push({
      nodeId: current.id,
      nodeType: current.type,
      label: current.data?.label || current.type,
      status: 'ok',
      message: `Executed: ${current.data?.label || current.type}`
    });

    const outgoingEdges = workflow.edges.filter((e) => e.source === current.id);
    for (const edge of outgoingEdges) {
      if (!visited.has(edge.target)) {
        visited.add(edge.target);
        const targetNode = workflow.nodes.find((n) => n.id === edge.target);
        if (targetNode) {
          queue.push(targetNode);
        }
      }
    }
  }

  return { success: true, steps, errors: [] };
}

