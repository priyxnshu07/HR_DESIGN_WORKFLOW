import { useState, useEffect } from 'react';
import { getAutomations } from '../api/automations';
import type { AutomationAction } from '../types/api';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useAutomations() {
  const [automations, setAutomations] = useState<AutomationAction[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const fetchAutomations = async () => {
      setStatus('loading');
      try {
        const data = await getAutomations();
        if (mounted) {
          setAutomations(data);
          setStatus('success');
        }
      } catch (err: unknown) {
        if (mounted) {
          setError((err as Error).message || 'Failed to fetch automations');
          setStatus('error');
        }
      }
    };

    fetchAutomations();

    return () => {
      mounted = false;
    };
  }, []);

  return { automations, status, error };
}
