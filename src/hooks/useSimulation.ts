import { useState, useCallback } from 'react';
import { simulateWorkflow } from '../api/simulate';
import { validateWorkflow } from '../utils/validateWorkflow';
import type { SimResult } from '../types/api';
import type { Workflow } from '../types/workflow';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useSimulation() {
  const [result, setResult] = useState<SimResult | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string[] | null>(null);

  const run = useCallback(async (workflow: Workflow) => {
    setStatus('loading');
    setError(null);
    setResult(null);

    try {
      // Validation stage
      const validationErrors = validateWorkflow(workflow);
      if (validationErrors && validationErrors.length > 0) {
        setError(validationErrors);
        setStatus('error');
        return;
      }

      // Execution stage
      const res = await simulateWorkflow(workflow);
      setResult(res);
      setStatus('success');
    } catch (err: unknown) {
      setError([(err as Error).message || 'Simulation failed']);
      setStatus('error');
    }
  }, []);

  return { run, result, status, error };
}
