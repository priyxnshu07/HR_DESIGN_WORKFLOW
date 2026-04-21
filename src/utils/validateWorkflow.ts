import type { Workflow } from '../types/workflow';
import { hasCycle } from './traverseGraph';

export function validateWorkflow(workflow: Workflow): string[] {
  const errors: string[] = [];
  const { nodes, edges } = workflow;

  // 1. Exactly one Start node
  const startNodes = nodes.filter(n => n.type === 'start');
  if (startNodes.length === 0) {
    errors.push('Workflow must have exactly one Start node.');
  } else if (startNodes.length > 1) {
    errors.push('Workflow cannot have more than one Start node.');
  }

  // 2. At least one End node
  const endNodes = nodes.filter(n => n.type === 'end');
  if (endNodes.length === 0) {
    errors.push('Workflow must have at least one End node.');
  }

  // 3. No orphaned nodes
  nodes.forEach(node => {
    const isSource = edges.some(e => e.source === node.id);
    const isTarget = edges.some(e => e.target === node.id);
    if (!isSource && !isTarget && nodes.length > 1) {
      errors.push(`Node '${node.data.label || node.id}' is disconnected from the workflow.`);
    }
  });

  // 4. No cycles
  if (hasCycle(nodes, edges)) {
    errors.push('Workflow contains a circular dependency (cycle) which is not allowed.');
  }

  // 5. Start node has no incoming edges
  if (startNodes.length === 1) {
    const startIncoming = edges.some(e => e.target === startNodes[0].id);
    if (startIncoming) {
      errors.push('Start node cannot have incoming connections.');
    }
  }

  return errors;
}
