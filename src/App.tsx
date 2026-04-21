import { useState } from 'react';
import WorkflowCanvas from './components/canvas/WorkflowCanvas';
import Sidebar from './components/sidebar/Sidebar';
import ConfigPanel from './components/config-panel/ConfigPanel';
import SimulationPanel from './components/simulation/SimulationPanel';
import { useWorkflow } from './hooks/useWorkflow';
import { serializeWorkflow } from './utils/serializeWorkflow';

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, selectedNode, updateNodeData } = useWorkflow();
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');

  const handleExport = () => {
    const serialized = serializeWorkflow('wf-export-1', workflowName, nodes, edges);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(serialized, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${workflowName.replace(/\s+/g, '_').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden text-gray-800 font-sans">
      <header className="h-14 flex-shrink-0 flex items-center justify-between px-6 bg-white border-b border-gray-200 shadow-sm z-30 relative">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold shadow-sm">
            HR
          </div>
          <h1 className="text-lg font-bold text-gray-900 tracking-tight">Workflow Designer</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <input 
            type="text" 
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="border-b border-dashed border-gray-300 px-2 py-1 focus:outline-none focus:border-solid focus:border-blue-600 font-semibold text-gray-700 bg-transparent w-64 placeholder-gray-400 transition-colors"
            placeholder="Workflow Name"
          />
          <button 
            onClick={handleExport}
            className="flex items-center justify-center space-x-1.5 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white text-gray-700 px-4 py-1.5 rounded-lg transition-all font-medium text-sm shadow-sm active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            <span>Export JSON</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden bg-slate-50 relative z-10 w-full h-full"> 
        <div className="w-[240px] flex-shrink-0 h-full bg-white border-r border-gray-200 z-10 flex flex-col">
          <Sidebar />
        </div>

        <main className="flex-1 min-w-0 relative">
          <WorkflowCanvas 
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            addNode={addNode}
          />
        </main>

        <aside className="w-[320px] flex-shrink-0 flex flex-col border-l border-gray-200 h-full bg-white relative z-20">
          <div className="h-[60%] w-full overflow-hidden flex flex-col bg-white">
             <ConfigPanel 
               selectedNode={selectedNode || null} 
               updateNodeData={updateNodeData} 
             />
          </div>
          <div className="h-[40%] w-full overflow-hidden flex flex-col bg-white border-t border-gray-200 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)]">
             <SimulationPanel nodes={nodes} edges={edges} />
          </div>
        </aside>
      </div>
    </div>
  );
}
