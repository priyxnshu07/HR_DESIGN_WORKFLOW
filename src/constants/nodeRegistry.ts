// Single source of truth for all node types. To add a new node type, add one entry here and create its component + form.
import type { NodeType, StartNodeData, TaskNodeData, ApprovalNodeData, AutomatedStepNodeData, EndNodeData } from '../types/nodes';

import StartNode from '../components/nodes/StartNode';
import EndNode from '../components/nodes/EndNode';
import TaskNode from '../components/nodes/TaskNode';
import ApprovalNode from '../components/nodes/ApprovalNode';
import AutomatedStepNode from '../components/nodes/AutomatedStepNode';

export const NODE_REGISTRY: Record<NodeType, {
  label: string;
  color: string;
  // Omit 'id' because it will be generated dynamically when dropping the node onto the canvas
  defaultData: Omit<StartNodeData | TaskNodeData | ApprovalNodeData | AutomatedStepNodeData | EndNodeData, 'id'>;
  description: string;
}> = {
  start: {
    label: 'Start Node',
    color: '#22c55e',
    defaultData: { label: 'Start', startTitle: 'Start Workflow', metadata: [] } as Omit<StartNodeData, 'id'>,
    description: 'Entry point of the workflow',
  },
  task: {
    label: 'Manual Task',
    color: '#3b82f6',
    defaultData: { label: 'New Task', title: '', description: '', assignee: '', dueDate: '', customFields: [] } as Omit<TaskNodeData, 'id'>,
    description: 'A task requiring human intervention',
  },
  approval: {
    label: 'Approval',
    color: '#f59e0b',
    defaultData: { label: 'New Approval', title: '', approverRole: '', autoApproveThreshold: 0 } as Omit<ApprovalNodeData, 'id'>,
    description: 'Requires approval from assigned role',
  },
  automated: {
    label: 'Automated Step',
    color: '#8b5cf6',
    defaultData: { label: 'New Action', title: '', actionId: '', actionParams: {} } as Omit<AutomatedStepNodeData, 'id'>,
    description: 'Executes a background system action',
  },
  end: {
    label: 'End Node',
    color: '#ef4444',
    defaultData: { label: 'End', endMessage: 'Workflow completed', summaryFlag: true } as Omit<EndNodeData, 'id'>,
    description: 'Finalize and close the workflow',
  },
};

export const NODE_TYPES_MAP = {
  start: StartNode,
  end: EndNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedStepNode,
};

export const SIDEBAR_NODES = (Object.keys(NODE_REGISTRY) as NodeType[]).map((type) => {
  const node = NODE_REGISTRY[type];
  return {
    type,
    label: node.label,
    color: node.color,
    description: node.description,
  };
});

