import { MOCK_AUTOMATIONS } from './mocks/automations.mock';
import { simulateMock } from './mocks/simulate.mock';
import type { Workflow } from '../types/workflow';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

export const http = {
  get: async <T>(url: string): Promise<T> => {
    if (useMock) {
      if (url === '/api/automations') {
        return Promise.resolve(MOCK_AUTOMATIONS as unknown as T);
      }
      throw new Error(`Mock not implemented for GET ${url}`);
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  },
  post: async <T>(url: string, data: unknown): Promise<T> => {
    if (useMock) {
      if (url === '/api/simulate') {
        return Promise.resolve(simulateMock(data as Workflow) as unknown as T);
      }
      throw new Error(`Mock not implemented for POST ${url}`);
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  }
};

