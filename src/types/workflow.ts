import type { WFNode } from './nodes';

export interface WFEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface Workflow {
  id: string;
  name: string;
  nodes: WFNode[];
  edges: WFEdge[];
}
