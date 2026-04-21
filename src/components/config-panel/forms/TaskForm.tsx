import { useNodeForm } from './useNodeForm';
import type { TaskNodeData } from '../../../types/nodes';

interface TaskFormProps {
  nodeId: string;
  data: TaskNodeData;
  onUpdate: (id: string, data: TaskNodeData) => void;
}

export default function TaskForm({ nodeId, data, onUpdate }: TaskFormProps) {
  const { formData, handleChange, handleArrayChange, addArrayItem, removeArrayItem } = useNodeForm<TaskNodeData>(nodeId, data, onUpdate);

  return (
    <div className="space-y-4 text-sm">
      <div>
        <label className="block text-gray-700 font-medium mb-1">Title *</label>
        <input 
          type="text" 
          value={formData.title || ''} 
          onChange={(e) => {
            handleChange('title', e.target.value);
            handleChange('label', e.target.value);
          }}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Description</label>
        <textarea 
          value={formData.description || ''} 
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Assignee</label>
        <input 
          type="text" 
          value={formData.assignee || ''} 
          onChange={(e) => handleChange('assignee', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Due Date</label>
        <input 
          type="date" 
          value={formData.dueDate || ''} 
          onChange={(e) => handleChange('dueDate', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Custom Fields</label>
        {formData.customFields?.map((item, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input 
              type="text" 
              placeholder="Key" 
              value={item.key || ''} 
              onChange={(e) => handleArrayChange('customFields', index, 'key', e.target.value)}
              className="w-1/2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
            />
            <input 
              type="text" 
              placeholder="Value" 
              value={item.value || ''} 
              onChange={(e) => handleArrayChange('customFields', index, 'value', e.target.value)}
              className="w-1/2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
            />
            <button 
              type="button" 
              onClick={() => removeArrayItem('customFields', index)} 
              className="bg-red-50 hover:bg-red-100 text-red-500 px-2 py-1 rounded"
              title="Remove Custom Field"
            >
              ✕
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={() => addArrayItem('customFields', { key: '', value: '' })}
          className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-xs transition-colors"
        >
          + Add Custom Field
        </button>
      </div>
    </div>
  );
}
