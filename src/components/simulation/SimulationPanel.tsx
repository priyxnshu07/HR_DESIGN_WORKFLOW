import type { Node, Edge } from '@xyflow/react';
import { useSimulation } from '../../hooks/useSimulation';
import { serializeWorkflow } from '../../utils/serializeWorkflow';

interface SimulationPanelProps {
  nodes: Node[];
  edges: Edge[];
}

export default function SimulationPanel({ nodes, edges }: SimulationPanelProps) {
  const { run, result, status, error } = useSimulation();

  const handleRun = () => {
    const workflow = serializeWorkflow('wf-1', 'My Workflow', nodes, edges);
    run(workflow);
  };

  return (
    <div className="flex flex-col h-full bg-white border-t border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50 shadow-[0_2px_4px_rgba(0,0,0,0.02)] z-10">
        <h2 className="text-md font-bold text-gray-800 tracking-tight">Simulation Engine</h2>
        <button 
          onClick={handleRun}
          disabled={status === 'loading'}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded shadow-sm text-sm font-semibold transition-colors flex items-center space-x-2"
        >
          {status === 'loading' && (
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          <span>{status === 'loading' ? 'Running...' : 'Run Simulation'}</span>
        </button>
      </div>
      
      <div className="flex-1 p-5 overflow-y-auto w-full bg-slate-50 relative">
        {status === 'idle' && (
          <div className="text-sm text-gray-500 italic text-center mt-10">
            Click run to validate graph layout and simulate node executions.
          </div>
        )}

        {status === 'error' && error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded text-sm text-red-700 shadow-sm animate-in fade-in slide-in-from-top-2">
            <h3 className="font-bold mb-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              Validation Errors:
            </h3>
            <ul className="list-disc pl-5 space-y-1 mt-2 font-medium">
              {error.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {result && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className={`p-4 rounded text-sm font-bold border shadow-sm flex items-center space-x-2 ${result.success ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {result.success ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              )}
              <span>{result.success ? 'Simulation Completed Successfully' : 'Simulation Failed'}</span>
            </div>

            <div className="relative border-l-2 border-gray-200 ml-4 space-y-6 mt-6 pb-4">
              {result.steps.map((step, idx) => (
                <div key={idx} className="relative pl-6 hover:translate-x-1 transition-transform">
                  <div className={`absolute -left-[11px] top-1.5 w-5 h-5 rounded-full border-4 border-slate-50 shadow-sm ${
                    step.status === 'ok' ? 'bg-green-500' : 
                    step.status === 'error' ? 'bg-red-500' : 'bg-yellow-400'
                  }`} />
                  <div className="bg-white border text-sm border-gray-200 shadow-sm rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="font-bold text-gray-800 mb-1 flex items-center justify-between">
                      {step.label}
                      <span className="text-[10px] uppercase font-bold text-gray-400">Step {idx + 1}</span>
                    </div>
                    <div className="text-gray-600 font-mono text-xs whitespace-pre-wrap mt-2 p-2 bg-gray-50 rounded border border-gray-100">{step.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
