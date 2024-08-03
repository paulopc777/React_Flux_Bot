import React, { useState } from "react";
import ConteinerDragg from "../Conteiners/BoxDragg/ConteinerDragg";
import useStore from "../../Redux/store";
import TextIcon from "../Utilitys/TextIcon/TextIcon";
import { Handle, Position } from "reactflow";
import DroppSelects, { PropsDropMenu } from "./DropDowMenus/DroppSelects";
import { BoxProps } from "./Client/PerguntaBox";
import Close from "./Close/Close";
import { useShallow } from "zustand/react/shallow";
import { initialEdges } from "../../InitialValue/nodes/edges";
import InputPad from "./Inputs/InputPad";
import DropDownInput from "./Inputs/DropDownInput";

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
  const [VisibleMenu, setVisibleMenu] = useState(false);

  function handleRemoveNode() {
    removeNode(id);
  }

  return (
    <>
      <ConteinerDragg w={'w-62'}>
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
            Mensagem de retorno {VisibleMenu ? "🔼"  : "🔽" }
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
