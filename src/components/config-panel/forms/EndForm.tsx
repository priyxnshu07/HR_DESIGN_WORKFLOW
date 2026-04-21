import { useNodeForm } from './useNodeForm';
import type { EndNodeData } from '../../../types/nodes';

interface EndFormProps {
  nodeId: string;
  data: EndNodeData;
  onUpdate: (id: string, data: EndNodeData) => void;
}

export default function EndForm({ nodeId, data, onUpdate }: EndFormProps) {
  const { formData, handleChange } = useNodeForm<EndNodeData>(nodeId, data, onUpdate);

  return (
    <div className="space-y-4 text-sm">
      <div>
        <label className="block text-gray-700 font-medium mb-1">End Message</label>
        <input 
          type="text" 
          value={formData.endMessage || ''} 
          onChange={(e) => {
            handleChange('endMessage', e.target.value);
            handleChange('label', e.target.value);
          }}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex items-center space-x-2 pt-2">
        <input 
          type="checkbox" 
          id="summaryFlag"
          checked={!!formData.summaryFlag} 
          onChange={(e) => handleChange('summaryFlag', e.target.checked)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        />
        <label htmlFor="summaryFlag" className="text-gray-700 cursor-pointer select-none">Include in workflow summary</label>
      </div>
    </div>
  );
}
