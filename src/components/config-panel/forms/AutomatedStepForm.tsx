import { useNodeForm } from './useNodeForm';
import { useAutomations } from '../../../hooks/useAutomations';
import type { AutomatedStepNodeData } from '../../../types/nodes';

interface AutomatedStepFormProps {
  nodeId: string;
  data: AutomatedStepNodeData;
  onUpdate: (id: string, data: AutomatedStepNodeData) => void;
}

export default function AutomatedStepForm({ nodeId, data, onUpdate }: AutomatedStepFormProps) {
  const { formData, handleChange } = useNodeForm<AutomatedStepNodeData>(nodeId, data, onUpdate);
  const { automations, status } = useAutomations();

  const handleActionChange = (actionId: string) => {
    handleChange('actionId', actionId);
    handleChange('actionParams', {}); // Reset params when the action type changes
  };

  const handleParamChange = (paramKey: string, value: string) => {
    const currentParams = (formData.actionParams as Record<string, string>) || {};
    handleChange('actionParams', { ...currentParams, [paramKey]: value });
  };

  const selectedAction = automations.find(a => a.id === formData.actionId);

  return (
    <div className="space-y-4 text-sm">
      <div>
        <label className="block text-gray-700 font-medium mb-1">Title</label>
        <input 
          type="text" 
          value={formData.title || ''} 
          onChange={(e) => {
            handleChange('title', e.target.value);
            handleChange('label', e.target.value);
          }}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Action (from HRIS/API)</label>
        {status === 'loading' ? (
          <div className="text-gray-500 italic py-2 text-xs">Loading available actions...</div>
        ) : (
          <select 
            value={formData.actionId || ''} 
            onChange={(e) => handleActionChange(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 bg-white"
          >
            <option value="">Select Action</option>
            {automations.map(action => (
              <option key={action.id} value={action.id}>{action.label}</option>
            ))}
          </select>
        )}
      </div>

      {selectedAction && selectedAction.params.length > 0 && (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded space-y-3">
          <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">Action Parameters</h4>
          {selectedAction.params.map(param => (
            <div key={param}>
              <label className="block text-gray-600 mb-1 capitalize text-xs">{param.replace('_', ' ')}</label>
              <input 
                type="text" 
                value={(formData.actionParams && (formData.actionParams as Record<string, string>)[param]) || ''} 
                onChange={(e) => handleParamChange(param, e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
