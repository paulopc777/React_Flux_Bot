import { create } from "zustand";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import { initialNodes } from "../InitialValue/nodes/nodes";
import { initialEdges } from "../InitialValue/nodes/edges";

interface Value {
  id: string;
  text?: string;
  Departamento?: string;
}

const useStore = create((set: any, get: any) => ({
  nodes: initialNodes,
  edges: initialEdges,
  formValues: [],
  // Mudança de Nodes / Movimentação
  onNodesChange: (changes: any) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: any) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: any) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes: any) => {
    set({ nodes });
  },
  setEdges: (edges: any) => {
    set({ edges });
  },
  addNode: (node: any) => {
    set((state: any) => ({ nodes: [...state.nodes, node] }));
  },
  removeNode: (nodeId: any) => {
    set((state: any) => ({
      nodes: state.nodes.filter((node: any) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge: any) => edge.source !== nodeId && edge.target !== nodeId
      ),
    }));
  },
  onEdgesDelete: (edgesToDelete: any) => {
    set((state: any) => ({
      edges: state.edges.filter(
        (edge: any) =>
          !edgesToDelete.some((deletedEdge: any) => deletedEdge.id === edge.id)
      ),
    }));
  },
  removeEdgesByNodeId: (nodeId: any) => {
    set((state: any) => ({
      edges: state.edges.filter(
        (edge: any) => edge.source !== nodeId && edge.target !== nodeId
      ),
    }));
  },
  addValue: (value: Value) =>
    set((state: any) => ({
      formValues: [...state.formValues, value],
    })),
  deleteValue: (id: string) =>
    set((state: any) => ({
      formValues: state.formValues.filter((value: any) => value.id !== id),
    })),
  updateValue: (id: string, button: string[]) =>
    set((state: any) => ({
      formValues: state.formValues.map((item: any) => {
        if (item.id === id) {
          return { ...item, button }; // Atualiza o texto
        }
        return item; // Retorna o item inalterado
      }),
    })),
  updateValueDep: (id: any, description: any) =>
    set((state: any) => ({
      formValues: state.formValues.map((item: any) => {
        if (item.id === id) {
          return { ...item, description }; // Adiciona/Atualiza a descrição
        }
        return item; // Retorna o item inalterado
      }),
    })),
  updateValueResposta: (id: any, description: any) =>
    set((state: any) => ({
      formValues: state.formValues.map((item: any) => {
        if (item.id === id) {
          return { ...item, text: description }; // Adiciona/Atualiza a descrição
        }
        return item; // Retorna o item inalterado
      }),
    })),
  updateFormValues: (newValues: any) => {
    const currentValues = get().formValues;
    const index = currentValues.findIndex(
      (item: any) => item.id === newValues.id
    );

    if (index !== -1) {
      // Verifica se o item encontrado é diferente do novo valor
      if (JSON.stringify(currentValues[index]) !== JSON.stringify(newValues)) {
        const updatedValues = [...currentValues];
        updatedValues[index] = newValues;
        set({ formValues: updatedValues });
      }
    } else {
      // Adiciona o novo item se ele não estiver na lista
      set({ formValues: [...currentValues, newValues] });
    }
  },
}));

export default useStore;
