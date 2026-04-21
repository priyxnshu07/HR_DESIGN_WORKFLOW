import { http } from './client';
import type { SimResult } from '../types/api';
import type { Workflow } from '../types/workflow';

export function simulateWorkflow(workflow: Workflow): Promise<SimResult> {
  return http.post<SimResult>('/api/simulate', workflow);
}

