import React, { useMemo } from "react";
import PerguntaBox from "./Nodes/Client/PerguntaBox";
import RespostaBox from "./Nodes/BoxResposta/RespostaBox";
import useStore from "../Redux/store";
import DepartamentoBox from "./Nodes/DepartamentoBox";
import BoxTimmer from "./Nodes/BoxTimmer";
import UsuarioBox from "./Nodes/UsuariosBox";
import { useCallback, useEffect, useState } from "react";
import OptRespostas from "./Nodes/BoxResposta/OptRespostas";
import { motion } from "framer-motion";
import BoxEdit, { selectView } from "app/Redux/EditMenuStore";
import { StoreSelector } from "app/Redux/Selector/storeSelector";
import {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  SmoothStepEdge,
  useReactFlow,
} from "reactflow";
import { useShallow } from "zustand/react/shallow";
import MinimapCustom from "./Flow/Minimap";
import BackgroundFlow from "./Flow/BackGrund";
import ErrorView, { selectError } from "app/Redux/erroStore";
import { ErrorState } from "../Redux/erroStore";

const NodeType = {
  PerguntaUnique: PerguntaBox,
  Resposta: RespostaBox,
  Departamento: DepartamentoBox,
  Timmer: BoxTimmer,
  Usuario: UsuarioBox,
};

const edgeTypes = {
  Padrao: SmoothStepEdge,
};

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

export default function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    useStore(StoreSelector);

  const { SelectItem, Visible } = BoxEdit(selectView);
  const { SetNewError, Error } = ErrorView(useShallow(selectError));
  const { screenToFlowPosition } = useReactFlow();

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }
      const ultimoNode = nodes[nodes.length - 1].id;

      // console.log(nodes.length);
      const idThoint = parseInt(ultimoNode) + 1;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${idThoint}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      addNode(newNode);
    },
    [screenToFlowPosition, nodes]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={NodeType}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
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
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <BackgroundFlow />
      <MinimapCustom />
      <Controls
        onInteractiveChange={(i) => {
          if (!Error.Visible) {
            if (i) {
              const Edit: ErrorState = {
                Text: "Mode de edição ativado ! ",
                Visible: true,
                Type: "success",
              };
              SetNewError(Edit);
            } else {
              const Edit: ErrorState = {
                Text: "Modo de edição desativado ! ",
                Visible: true,
              };
              SetNewError(Edit);
            }
          }
        }}
      />

      <motion.div
        animate={Visible ? "open" : "closed"}
        variants={variants}
        className="absolute left-0 top-10 z-[200] ml-2 mt-6"
      >
        <OptRespostas></OptRespostas>
      </motion.div>
    </ReactFlow>
  );
}
