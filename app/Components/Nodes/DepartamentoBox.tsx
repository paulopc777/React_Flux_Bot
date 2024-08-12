import React, { useState } from "react";
import ConteinerDragg from "../Conteiners/BoxDragg/ConteinerDragg";
import TextIcon from "../Utilitys/TextIcon/TextIcon";
import { Handle, Position } from "reactflow";
import DroppSelects from "./DropDowMenus/DroppSelects";
import { BoxProps } from "./Client/PerguntaBox";
import Close from "./Close/Close";
import DropDownInput from "./Inputs/DropDownInput";

export default function DepartamentoBox({ id }: BoxProps) {
  const [VisibleMenu, setVisibleMenu] = useState(false);

  return (
    <>
      <ConteinerDragg w={"w-62"}>
        <Close id={id}></Close>
        <TextIcon
          icon={"/svg/Departament.svg"}
          text={"Transferir para Departamento"}
        />

        <div className="">
          <DroppSelects id={id}></DroppSelects>
        </div>

        <div
          className="text-zinc-500 py-1 cursor-pointer"
          onClick={() => {
            setVisibleMenu(!VisibleMenu);
          }}
        >
          <p className="text-[.7rem] hover:text-zinc-400 ">
            Mensagem de retorno {VisibleMenu ? "🔼" : "🔽"}
          </p>
        </div>
        <div>
          <DropDownInput VisibleDesk={VisibleMenu} id={id}></DropDownInput>
        </div>
      </ConteinerDragg>
      <Handle type="source" position={Position.Left} />
    </>
  );
}
