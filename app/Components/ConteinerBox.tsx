import ReactFlow, {
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  SmoothStepEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import PerguntaBox from "./Nodes/BoxInputsUsuario/PerguntaBox";
import RespostaBox from "./Nodes/RespostaBox";
import HeaderNav from "./Header/Index";
import useStore from "../Redux/store";
import { useShallow } from "zustand/react/shallow";
import DepartamentoBox from "./Nodes/DepartamentoBox";
import BoxTimmer from "./Nodes/BoxTimmer";

const NodeType = {
  PerguntaUnique: PerguntaBox,
  Resposta: RespostaBox,
  Departamento: DepartamentoBox,
  Timmer: BoxTimmer,
};

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
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(useShallow(selector));

  return (
    <>
      <div className="overflow-hidden dark:bg-zinc-900">
        <HeaderNav></HeaderNav>

        <div className="h-screen bg-white dark:bg-zinc-800">
          <ReactFlowProvider>
            <Background
              color="bg-zinc-800"
              variant={BackgroundVariant.Dots}
              size={2}
              className="opacity-80"
              gap={50}
            />
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
            />
          </ReactFlowProvider>
        </div>
      </div>
    </>
  );
}
