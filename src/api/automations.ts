import { http } from './client';
import type { AutomationAction } from '../types/api';

export function getAutomations(): Promise<AutomationAction[]> {
  return http.get<AutomationAction[]>('/api/automations');
}

