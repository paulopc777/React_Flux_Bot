import {
  Background,
  BackgroundVariant,
  ConnectionMode,
  ReactFlowProvider,
  SmoothStepEdge,
  MiniMap,
  MarkerType,
  Controls,
} from "reactflow";

// import {} from "@xyflow/react";

import { ReactFlow } from "reactflow";

import "reactflow/dist/style.css";
import PerguntaBox from "./Nodes/User/PerguntaBox";
import RespostaBox from "./Nodes/BoxResposta/RespostaBox";
import HeaderNav from "./Header/Index";
import useStore from "../Redux/store";
import { useShallow } from "zustand/react/shallow";
import DepartamentoBox from "./Nodes/DepartamentoBox";
import BoxTimmer from "./Nodes/BoxTimmer";
import UsuarioBox from "./Nodes/UsuariosBox";
import AlertBox from "./Utilitys/ErrorBox";
import { useEffect, useState } from "react";
import ErrorView, { selectError } from "app/Redux/erroStore";
import OptRespostas from "./Nodes/BoxResposta/OptRespostas";
import { motion } from "framer-motion";
import BoxEdit, { selectView } from "app/Redux/EditingStore";

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
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};
const nodeClassName = (node: any) => node.type;

export default function ConteinerBox() {
  const { Error, ToggleErrorVisibility } = ErrorView(useShallow(selectError));
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(selector)
  );

  const { SelectItem, Visible } = BoxEdit(selectView);

  // useEffect(() => {
  //   console.log(Error);
  // }, [Error]);

  return (
    <>
      <div className="overflow-hidden dark:bg-zinc-900">
        <HeaderNav></HeaderNav>
        <AlertBox
          Text={Error.Text}
          Visible={Error.Visible}
          Type={Error.Type}
          ErrorImg={Error.ErrorImg}
        ></AlertBox>

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
                markerStart: {
                  type: MarkerType.ArrowClosed,
                  width: 30,
                  height: 30,
                  color: "#8d8d8d",
                },
              }}
              connectionMode={ConnectionMode.Loose}
            >
              <Background
                color="bg-white"
                variant={BackgroundVariant.Dots}
                size={2}
                className="opacity-80"
                gap={50}
              />
              <MiniMap
                zoomable
                pannable
                nodeClassName={nodeClassName}
                nodeColor={nodeColor}
              />
              <Controls />
              <motion.div
                animate={Visible ? "open" : "closed"}
                variants={variants}
                className="absolute left-0 top-10 z-[200] ml-2 mt-6"
              >
                <OptRespostas></OptRespostas>
              </motion.div>
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </>
  );
}
