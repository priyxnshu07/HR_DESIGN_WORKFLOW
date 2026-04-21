import { useCallback, useMemo } from 'react';
import { useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import type { Node, Edge, Connection } from '@xyflow/react';

import { NODE_REGISTRY } from '../constants/nodeRegistry';
import type { NodeType } from '../types/nodes';

const generateId = () => `node_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

export function useWorkflow() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = useCallback((type: NodeType, position: { x: number, y: number }) => {
    const id = generateId();
    const defaultData = NODE_REGISTRY[type]?.defaultData;
    
    const newNode: Node = {
      id,
      type,
      position,
      data: { ...(defaultData || {}), label: defaultData?.label || type }
    };

    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const updateNodeData = useCallback((id: string, dataUpdate: Record<string, unknown>) => {
    setNodes((nds) => 
      nds.map(node => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...dataUpdate } };
        }
        return node;
      })
    );
  }, [setNodes]);

  const deleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter(n => n.id !== id));
    setEdges((eds) => eds.filter(e => e.source !== id && e.target !== id));
  }, [setNodes, setEdges]);

  // localStorage persistence
  const saveWorkflow = useCallback(() => {
    try {
      localStorage.setItem('workflow', JSON.stringify({ nodes, edges }));
      alert('Workflow saved locally!');
    } catch (err) {
      console.error('Failed to save workflow:', err);
      alert('Error saving workflow.');
    }
  }, [nodes, edges]);

  const loadWorkflow = useCallback(() => {
    try {
      const data = localStorage.getItem('workflow');
      if (!data) {
        alert('No saved workflow found.');
        return;
      }
      const parsed = JSON.parse(data);
      if (parsed.nodes && parsed.edges) {
        setNodes(parsed.nodes);
        setEdges(parsed.edges);
        alert('Workflow loaded successfully!');
      } else {
        alert('Invalid workflow payload.');
      }
    } catch (err) {
      console.error('Failed to parse workflow:', err);
      alert('Failed to load workflow data. Corrupted JSON.');
    }
  }, [setNodes, setEdges]);

  // Derive selected node based on exactly one selected item
  const selectedNode = useMemo(() => nodes.find(n => n.selected), [nodes]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNodeData,
    deleteNode,
    saveWorkflow,
    loadWorkflow,
    selectedNode
  };
}
