import type React from 'react';
import { useCallback } from 'react';
import { ReactFlow, MiniMap, Controls, Background, BackgroundVariant, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import type { Node, Edge, OnNodesChange, OnEdgesChange, Connection } from '@xyflow/react';

import { NODE_TYPES_MAP } from '../../constants/nodeRegistry';
import type { NodeType } from '../../types/nodes';

interface WorkflowCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
  addNode: (type: NodeType, position: { x: number, y: number }) => void;
}

function Flow({ nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode }: WorkflowCanvasProps) {
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(type, position);
    },
    [addNode, screenToFlowPosition]
  );

  return (
    <div className="absolute inset-0 w-full h-full bg-slate-50">
      {nodes.length === 0 && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center space-y-3 bg-white/70 backdrop-blur px-8 py-6 rounded-2xl shadow-sm border border-gray-200">
             <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
             <span className="text-gray-500 font-semibold tracking-wide">Drag a node from the sidebar to get started</span>
          </div>
        </div>
      )}
      <div style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={NODE_TYPES_MAP as Record<string, React.ComponentType<import('@xyflow/react').NodeProps>>}
          onDragOver={onDragOver}
          onDrop={onDrop}
          fitView
        >
          <Background variant={BackgroundVariant.Dots} gap={16} size={1.2} />
          <MiniMap zoomable pannable nodeColor="#cbd5e1" maskColor="rgba(248, 250, 252, 0.7)" />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function WorkflowCanvas(props: WorkflowCanvasProps) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
}
