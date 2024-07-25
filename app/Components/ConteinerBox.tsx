import {
  Background,
  BackgroundVariant,
  MiniMap,
  ReactFlowProvider,
  SmoothStepEdge,
} from "reactflow";

import { ReactFlow } from "reactflow";

import "reactflow/dist/style.css";
import PerguntaBox from "./Nodes/BoxInputsUsuario/PerguntaBox";
import RespostaBox from "./Nodes/RespostaBox";
import HeaderNav from "./Header/Index";
import useStore from "../Redux/store";
import { useShallow } from "zustand/react/shallow";
import DepartamentoBox from "./Nodes/DepartamentoBox";
import BoxTimmer from "./Nodes/BoxTimmer";
import UsuarioBox from "./Nodes/UsuariosBox";

const NodeType = {
  PerguntaUnique: PerguntaBox,
  Resposta: RespostaBox,
  Departamento: DepartamentoBox,
  Timmer: BoxTimmer,
  Usuario: UsuarioBox,
};

function nodeColor(node: any) {
  switch (node.type) {
    case "PerguntaUnique":
      return "#6ede87";
    case "Resposta":
      return "#048cfc";
    case "Departamento":
      return "#faa204";
    default:
      return "#ff0072";
  }
}

const edgeTypes = {
  Padrao: SmoothStepEdge,
};

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export default function ConteinerBox() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(selector)
  );

  return (
    <>
      <div className="overflow-hidden dark:bg-zinc-900">
        <HeaderNav></HeaderNav>

        <div className="h-screen bg-white dark:bg-zinc-800">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={NodeType}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              edgeTypes={edgeTypes}
              defaultEdgeOptions={{
                type: "Padrao",
              }}
            >
              <Background
                color="bg-white"
                variant={BackgroundVariant.Dots}
                size={2}
                className="opacity-80"
                gap={50}
              />

              <MiniMap nodeStrokeWidth={3} nodeColor={nodeColor} />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </>
  );
}
