import type { Node } from '@xyflow/react';
import { NODE_REGISTRY } from '../../constants/nodeRegistry';
import StartForm from './forms/StartForm';
import TaskForm from './forms/TaskForm';
import ApprovalForm from './forms/ApprovalForm';
import AutomatedStepForm from './forms/AutomatedStepForm';
import EndForm from './forms/EndForm';

import type { StartNodeData, TaskNodeData, ApprovalNodeData, AutomatedStepNodeData, EndNodeData } from '../../types/nodes';

interface ConfigPanelProps {
  selectedNode: Node | null;
  updateNodeData: (id: string, data: Record<string, unknown>) => void;
}

export default function ConfigPanel({ selectedNode, updateNodeData }: ConfigPanelProps) {
  if (!selectedNode) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-gray-500 text-sm border-l border-gray-200 bg-white">
        <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2z"></path></svg>
        <span>Select a node to configure it</span>
      </div>
    );
  }

  const registry = NODE_REGISTRY[selectedNode.type as import('../../types/nodes').NodeType];

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200 w-80 overflow-y-auto">
      <div className="px-5 py-4 border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-2">
          {registry && (
             <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: registry.color }}></span>
          )}
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">Configuration</h2>
        </div>
        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">
          {registry?.label || selectedNode.type} Node
        </div>
      </div>

      <div className="p-5 flex-1">
        {selectedNode.type === 'start' && <StartForm nodeId={selectedNode.id} data={selectedNode.data as unknown as StartNodeData} onUpdate={updateNodeData as unknown as (id:string, data:StartNodeData) => void} />}
        {selectedNode.type === 'task' && <TaskForm nodeId={selectedNode.id} data={selectedNode.data as unknown as TaskNodeData} onUpdate={updateNodeData as unknown as (id:string, data:TaskNodeData) => void} />}
        {selectedNode.type === 'approval' && <ApprovalForm nodeId={selectedNode.id} data={selectedNode.data as unknown as ApprovalNodeData} onUpdate={updateNodeData as unknown as (id:string, data:ApprovalNodeData) => void} />}
        {selectedNode.type === 'automated' && <AutomatedStepForm nodeId={selectedNode.id} data={selectedNode.data as unknown as AutomatedStepNodeData} onUpdate={updateNodeData as unknown as (id:string, data:AutomatedStepNodeData) => void} />}
        {selectedNode.type === 'end' && <EndForm nodeId={selectedNode.id} data={selectedNode.data as unknown as EndNodeData} onUpdate={updateNodeData as unknown as (id:string, data:EndNodeData) => void} />}
        {!['start', 'task', 'approval', 'automated', 'end'].includes(selectedNode.type as string) && (
          <div className="text-sm text-red-500 p-2 bg-red-50 border border-red-200 rounded">
            Configuration panel not implemented for this node type.
          </div>
        )}
      </div>
    </div>
  );
}
