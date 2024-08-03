import React, { useState } from "react";
import ConteinerDragg from "../Conteiners/BoxDragg/ConteinerDragg";
import useStore from "../../Redux/store";
import TextIcon from "./TextIcon/TextIcon";
import { Handle, Position } from "reactflow";
import DroppSelects from "../Utilitys/DropsMenus/DropSelectUsuer";
import { BoxProps } from "./User/PerguntaBox";
import Close from "./Close/Close";
import { useShallow } from "zustand/react/shallow";

export default function UsuarioBox({ id }: BoxProps) {
  const removeNode = useStore((state) => state.removeNode);

  function handleRemoveNode() {
    removeNode(id);
  }

  return (
    <>
      <ConteinerDragg>
        <Close id={id}></Close>
        <TextIcon
          icon={"/svg/user.svg"}
          text={"Transferir para Usuario"}
        />

        <div className="">
          <DroppSelects id={id}></DroppSelects>
        </div>
      </ConteinerDragg>
      <Handle type="source" position={Position.Left} />
    </>
  );
}