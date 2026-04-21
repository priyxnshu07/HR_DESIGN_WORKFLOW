import { useNodeForm } from './useNodeForm';
import type { StartNodeData } from '../../../types/nodes';

interface StartFormProps {
  nodeId: string;
  data: StartNodeData;
  onUpdate: (id: string, data: StartNodeData) => void;
}

export default function StartForm({ nodeId, data, onUpdate }: StartFormProps) {
  const { formData, handleChange, handleArrayChange, addArrayItem, removeArrayItem } = useNodeForm<StartNodeData>(nodeId, data, onUpdate);

  return (
    <div className="space-y-4 text-sm">
      <div>
        <label className="block text-gray-700 font-medium mb-1">Start Title *</label>
        <input 
          type="text" 
          value={formData.startTitle || ''} 
          onChange={(e) => {
            handleChange('startTitle', e.target.value);
            handleChange('label', e.target.value);
          }}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Metadata</label>
        {formData.metadata?.map((item, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input 
              type="text" 
              placeholder="Key" 
              value={item.key || ''} 
              onChange={(e) => handleArrayChange('metadata', index, 'key', e.target.value)}
              className="w-1/2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
            />
            <input 
              type="text" 
              placeholder="Value" 
              value={item.value || ''} 
              onChange={(e) => handleArrayChange('metadata', index, 'value', e.target.value)}
              className="w-1/2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
            />
            <button 
              type="button" 
              onClick={() => removeArrayItem('metadata', index)} 
              className="bg-red-50 hover:bg-red-100 text-red-500 px-2 py-1 rounded"
              title="Remove Metadata"
            >
              ✕
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={() => addArrayItem('metadata', { key: '', value: '' })}
          className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-xs transition-colors"
        >
          + Add Metadata
        </button>
      </div>
    </div>
  );
}
