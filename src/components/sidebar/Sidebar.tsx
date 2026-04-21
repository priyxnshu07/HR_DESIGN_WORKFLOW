import type React from 'react';
import { SIDEBAR_NODES } from '../../constants/nodeRegistry';

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 h-full flex flex-col shadow-sm select-none z-10 overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Components</h2>
      <div className="text-xs text-gray-500 mb-5 leading-relaxed">
        Drag and drop components to the right to build your workflow.
      </div>
      <div className="flex flex-col space-y-3">
        {SIDEBAR_NODES.map((node) => (
          <div
            key={node.type}
            className="flex flex-col p-3 border border-gray-200 bg-gray-50 rounded cursor-grab hover:shadow-md hover:border-blue-200 transition-all active:cursor-grabbing"
            onDragStart={(event) => onDragStart(event, node.type)}
            draggable
          >
            <div className="flex items-center space-x-2 font-semibold text-sm mb-1 text-gray-700">
              <span 
                className="w-3 h-3 rounded-full inline-block shadow-sm" 
                style={{ backgroundColor: node.color }}
              ></span>
              <span>{node.label}</span>
            </div>
            <p className="text-xs text-gray-500 leading-tight">{node.description}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
