import BaseNode from './BaseNode';
import type { NodeProps } from '@xyflow/react';
import type { NodeType } from '../../types/nodes';

export default function AutomatedStepNode(props: NodeProps) {
  const data = props.data as Record<string, unknown>;
  return (
    <BaseNode {...props} type={props.type as NodeType} data={data}>
      <div className="text-xs text-purple-600 font-medium tracking-wide">
        ⚡ {(data.actionId as string) || 'No setup action'}
      </div>
    </BaseNode>
  );
}
