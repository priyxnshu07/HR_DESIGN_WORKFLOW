import { useState, useCallback } from 'react';

export function useNodeForm<T extends object>(
  nodeId: string,
  initialData: T,
  onUpdate: (id: string, data: T) => void
) {
  const [formData, setFormData] = useState<T>(initialData);
  const [isDirty, setIsDirty] = useState(false);
  const [prevNodeId, setPrevNodeId] = useState(nodeId);

  // standard React render-phase prop sync
  if (nodeId !== prevNodeId) {
    setPrevNodeId(nodeId);
    setFormData(initialData);
    setIsDirty(false);
  }

  const handleChange = useCallback((field: keyof T, value: unknown) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      onUpdate(nodeId, next as T);
      return next as T;
    });
    setIsDirty(true);
  }, [nodeId, onUpdate]);

  const handleArrayChange = useCallback((field: keyof T, index: number, key: string, value: string) => {
    setFormData((prev) => {
      const currentArray = (prev[field] as unknown as Record<string, unknown>[]) || [];
      const array = [...currentArray];
      array[index] = { ...array[index], [key]: value };
      const next = { ...prev, [field]: array };
      onUpdate(nodeId, next as unknown as T);
      return next as unknown as T;
    });
    setIsDirty(true);
  }, [nodeId, onUpdate]);

  const addArrayItem = useCallback((field: keyof T, emptyItem: Record<string, unknown>) => {
    setFormData((prev) => {
      const currentArray = (prev[field] as unknown as Record<string, unknown>[]) || [];
      const array = [...currentArray, emptyItem];
      const next = { ...prev, [field]: array };
      onUpdate(nodeId, next as unknown as T);
      return next as unknown as T;
    });
    setIsDirty(true);
  }, [nodeId, onUpdate]);

  const removeArrayItem = useCallback((field: keyof T, index: number) => {
    setFormData((prev) => {
      const currentArray = (prev[field] as unknown as Record<string, unknown>[]) || [];
      const array = [...currentArray];
      array.splice(index, 1);
      const next = { ...prev, [field]: array };
      onUpdate(nodeId, next as unknown as T);
      return next as unknown as T;
    });
    setIsDirty(true);
  }, [nodeId, onUpdate]);

  return {
    formData,
    handleChange,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    isDirty
  };
}
