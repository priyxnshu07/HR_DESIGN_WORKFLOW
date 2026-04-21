export interface AutomationParam {
  name: string;
  label: string;
}

export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

export interface SimStep {
  nodeId: string;
  nodeType: string;
  label: string;
  status: 'ok' | 'warn' | 'error';
  message?: string;
}

export interface SimResult {
  success: boolean;
  steps: SimStep[];
  errors: string[];
}
