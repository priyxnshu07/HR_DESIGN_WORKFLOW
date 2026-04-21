import { useNodeForm } from './useNodeForm';
import type { ApprovalNodeData } from '../../../types/nodes';

interface ApprovalFormProps {
  nodeId: string;
  data: ApprovalNodeData;
  onUpdate: (id: string, data: ApprovalNodeData) => void;
}

export default function ApprovalForm({ nodeId, data, onUpdate }: ApprovalFormProps) {
  const { formData, handleChange } = useNodeForm<ApprovalNodeData>(nodeId, data, onUpdate);

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
        <label className="block text-gray-700 font-medium mb-1">Approver Role</label>
        <select 
          value={formData.approverRole || ''} 
          onChange={(e) => handleChange('approverRole', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 bg-white"
        >
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="HRBP">HRBP</option>
          <option value="Director">Director</option>
          <option value="CEO">CEO</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Auto-approve if score above X</label>
        <input 
          type="number" 
          min="0" max="100"
          value={formData.autoApproveThreshold ?? ''} 
          onChange={(e) => handleChange('autoApproveThreshold', parseInt(e.target.value, 10) || 0)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
}
