import React, { useState } from "react";
import ConteinerDragg from "../Conteiners/BoxDragg/ConteinerDragg";
import useStore from "../../Redux/store";
import TextIcon from "../Utilitys/TextIcon/TextIcon";
import { Handle, Position } from "reactflow";
import DroppSelects from "./DropDowMenus/DropSelectUsuer";
import { BoxProps } from "./Client/PerguntaBox";
import Close from "./Close/Close";


export default function UsuarioBox({ id }: BoxProps) {

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