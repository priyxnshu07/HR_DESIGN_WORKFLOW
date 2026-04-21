import type React from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { NODE_REGISTRY } from '../../constants/nodeRegistry';
import type { NodeType } from '../../types/nodes';

export interface BaseNodeProps extends NodeProps {
  type: NodeType;
  data: {
    label?: string;
    [key: string]: unknown;
  };
}

export default function BaseNode({ id, type, data, selected, children }: BaseNodeProps & { children?: React.ReactNode }) {
  const { deleteElements } = useReactFlow();
  const registry = NODE_REGISTRY[type];

  const showTarget = type !== 'start';
  const showSource = type !== 'end';

  return (
    <div 
      className={`relative min-w-[200px] bg-white rounded shadow-sm flex flex-col border border-gray-200 transition-all ${selected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
      style={{ borderLeftWidth: '8px', borderLeftColor: registry?.color || '#cbd5e1' }}
    >
      {showTarget && <Handle type="target" position={Position.Top} className="w-3 h-3 bg-gray-400" />}
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          deleteElements({ nodes: [{ id }] });
        }}
        className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 text-xs transition-colors"
      >
        ✕
      </button>

      <div className="px-4 py-2 border-b border-gray-100 mb-2 pr-8">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{registry?.label}</div>
        <div className="text-sm font-bold text-gray-800">{String(data.label || 'Untitled')}</div>
      </div>

      <div className="px-4 pb-3">
        {children}
      </div>

      {showSource && <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-gray-400" />}
    </div>
  );
}
