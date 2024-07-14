import React, { useState } from "react";
import ConteinerDragg from "../Conteiners/BoxDragg/ConteinerDragg";
import useStore from "../../Redux/store";
import TextIcon from "./TextUtility/TextIcon";
import { Handle, Position } from "reactflow";
import DroppSelects, { PropsDropMenu } from "../Utilitys/DroppSelects";
import { BoxProps } from "./BoxInputsUsuario/PerguntaBox";
import Close from "./Close/Close";

const OptMenu: PropsDropMenu[] = [
  {
    nome: "Financeiro",
  },
  {
    nome: "Comercial",
  },
  {
    nome: "Monitcall",
  },
  {
    nome: "Monitchat",
  },
];

export default function DepartamentoBox({ id }: BoxProps) {
  const removeNode = useStore((state) => state.removeNode);
  function handleRemoveNode() {
    removeNode(id);
  }

  return (
    <>
      <ConteinerDragg>
        <Close id={id}></Close>
        <TextIcon
          icon={"/svg/Departament.svg"}
          text={"Enviar para Departamento"}
        />

        <div className="">
          <DroppSelects OptsMenu={OptMenu}></DroppSelects>
        </div>
      </ConteinerDragg>
      <Handle type="source" position={Position.Left} />
    </>
  );
}
