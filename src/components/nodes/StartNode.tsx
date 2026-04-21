import BaseNode from './BaseNode';
import type { NodeProps } from '@xyflow/react';
import type { NodeType } from '../../types/nodes';

export default function StartNode(props: NodeProps) {
  const data = props.data as Record<string, unknown>;
  return (
    <BaseNode {...props} type={props.type as NodeType} data={data}>
      <div className="text-xs text-gray-600">
        Action: {(data.startTitle as string) || 'Not defined'}
      </div>
    </BaseNode>
  );
}
