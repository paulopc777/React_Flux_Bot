import { create } from "zustand";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import { initialNodes } from "../InitialValue/nodes/nodes";
import { initialEdges } from "../InitialValue/nodes/edges";

interface Value {
  id: string;
  text?: string;
  Departamento?: string;
}

const data = [
  {
    id: "3",
    text: "Comercial",
  },
  {
    id: "5",
    text: "Financeiro",
  },
  {
    id: "6",
    text: "Suporte",
  },
  {
    id: "4",
    Departamento: "Comercial",
    description: "{contact_name} oasd 😊",
  },
  {
    id: "7",
    Departamento: "Financeiro",
    description: "{contact_name} 😊",
  },
  {
    id: "8",
    Body: "aplicação ",
    Footer: "ou digite sair",
    desc: "<p>Qual a aplicação ?</p>",
    button: [
      {
        id: 1,
        text: "Monitchat",
      },
      {
        id: 2,
        text: "Monitcall",
      },
    ],
  },
  {
    id: "9",
    text: "Monitchat",
  },
  {
    id: "10",
    text: "Monitcall",
  },
  {
    id: "12",
    Departamento: "Monitchat",
  },
  {
    id: "11",
    Departamento: "Monitcall",
  },
  {
    id: "2",
    Body: "Departamentos",
    Footer: "ou digite sair",
    desc: "<p>Ola bem vindo ao Suporte da VipPhone !</p>",
    button: [
      {
        id: 1,
        text: "Comercial ",
      },
      {
        id: 2,
        text: "Financeiro",
      },
      {
        id: 3,
        text: "Suporte",
      },
    ],
  },
];

const useStore = create((set: any, get: any) => ({
  nodes: [],
  edges: [],
  formValues: [],

  //
  // Função para atualizar os nodes
  updateNodes: (newNodes: any) => set((state: any) => ({ nodes: newNodes })),

  // Função para atualizar os edges
  updateEdges: (newEdges: any) => set((state: any) => ({ edges: newEdges })),

  // Função para atualizar os formValues
  updateFormValuesA: (newFormValues: any) =>
    set((state: any) => ({ formValues: newFormValues })),

  // Mudança de Nodes / Movimentação
  onNodesChange: (changes: any) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  getFormById: (id: any) => {
    return get().formValues.find((item: any) => item.id === id);
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
