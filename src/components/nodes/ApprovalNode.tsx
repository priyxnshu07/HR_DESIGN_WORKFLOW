import BaseNode from './BaseNode';
import type { NodeProps } from '@xyflow/react';
import type { NodeType } from '../../types/nodes';

export default function ApprovalNode(props: NodeProps) {
  const data = props.data as Record<string, unknown>;
  return (
    <BaseNode {...props} type={props.type as NodeType} data={data}>
      <div className="text-xs text-gray-600">
        Approver: {(data.approverRole as string) || 'Any Role'}
      </div>
    </BaseNode>
  );
}
