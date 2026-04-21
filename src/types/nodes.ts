export interface BaseNodeData {
  id: string;
  label: string;
}

export interface StartNodeData extends BaseNodeData {
  startTitle: string;
  metadata: { key: string; value: string }[];
}

export interface TaskNodeData extends BaseNodeData {
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: { key: string; value: string }[];
}

export interface ApprovalNodeData extends BaseNodeData {
  title: string;
  approverRole: string;
  autoApproveThreshold: number;
}

export interface AutomatedStepNodeData extends BaseNodeData {
  title: string;
  actionId: string;
  actionParams: Record<string, string>;
}

export interface EndNodeData extends BaseNodeData {
  endMessage: string;
  summaryFlag: boolean;
}

export type NodeType = 'start' | 'end' | 'task' | 'approval' | 'automated';

export interface WFNode<T = BaseNodeData> {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: T;
}
