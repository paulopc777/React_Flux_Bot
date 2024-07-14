import React from "react";
import ConteinerDragg from "../Conteiners/BoxDragg/ConteinerDragg";
import TextIcon from "../TextUtility/TextIcon";
import DroppSelects, { PropsDropMenu } from "../Utilitys/DroppSelects";
import { Handle, Position } from "reactflow";
import Close from "./Close/Close";
import { BoxProps } from "./BoxInputsUsuario/PerguntaBox";

const Times: PropsDropMenu[] = [
  { nome: "1 min" },
  { nome: "5 min" },
  { nome: "10 min" },
];

export default function BoxTimmer({ id }: BoxProps) {
  return (
    <ConteinerDragg>
      <Close id={id}></Close>
      <TextIcon icon="/svg/Clock.svg" text="Esperar" />
      <DroppSelects OptsMenu={Times}></DroppSelects>
      <Handle position={Position.Left} type="source" />
      <Handle position={Position.Right} type="target" />
    </ConteinerDragg>
  );
}