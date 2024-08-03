import React from "react";
import { MiniMap } from "reactflow";

const nodeClassName = (node: any) => node.type;
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

export default function MinimapCustom() {
  return (
    <MiniMap
      zoomable
      pannable
      nodeClassName={nodeClassName}
      nodeColor={nodeColor}
    />
  );
}
