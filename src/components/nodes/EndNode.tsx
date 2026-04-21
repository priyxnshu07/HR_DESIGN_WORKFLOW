import BaseNode from './BaseNode';
import type { NodeProps } from '@xyflow/react';
import type { NodeType } from '../../types/nodes';

export default function EndNode(props: NodeProps) {
  const data = props.data as Record<string, unknown>;
  return (
    <BaseNode {...props} type={props.type as NodeType} data={data}>
      <div className="text-xs text-gray-500 italic">
        "{(data.endMessage as string) || 'Completed'}"
      </div>
    </BaseNode>
  );
}
