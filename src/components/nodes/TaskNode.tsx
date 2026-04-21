import BaseNode from './BaseNode';
import type { NodeProps } from '@xyflow/react';
import type { NodeType } from '../../types/nodes';

export default function TaskNode(props: NodeProps) {
  const data = props.data as Record<string, unknown>;
  return (
    <BaseNode {...props} type={props.type as NodeType} data={data}>
      <div className="text-xs text-gray-600 truncate">
        Task: {(data.title as string) || 'Untitled'}
      </div>
      {(data.assignee as string) && (
        <div className="text-xs text-blue-600 mt-1 font-medium">
          👤 {String(data.assignee)}
        </div>
      )}
    </BaseNode>
  );
}
