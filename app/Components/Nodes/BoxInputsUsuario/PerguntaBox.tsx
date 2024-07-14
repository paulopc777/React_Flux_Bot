"use client";

import React, { useMemo, useState } from "react";
import { Handle, Position } from "reactflow";
import TextIcon from "../../TextUtility/TextIcon";
import useStore from "../../../Redux/store";
import ConteinerDragg from "../../Conteiners/BoxDragg/ConteinerDragg";
import Close from "../Close/Close";

export interface BoxProps {
  id: string;
}

export default function PerguntaBox({ id }: BoxProps) {
  const [checkBox, setCheckBox] = useState(false);
  const removeNode = useStore((state) => state.removeNode);

  function ChangeCheckBox() {
    setCheckBox(!checkBox);
  }

  function handleRemoveNode() {
    removeNode(id);
  }

  return (
    <>
      <ConteinerDragg>
        <Close id={id}></Close>
        <TextIcon
          icon="svg/messagerec.svg"
          text="Mensagem do Usuairo"
        ></TextIcon>

        {checkBox ? (
          ""
        ) : (
          <input
            type="text"
            placeholder="Mensagem"
            className="p-1 shadow-inner my-4 dark:bg-neutral-800 w-full"
          />
        )}

        <div className=" flex items-center ">
          <input type="checkbox" name="Message" onClick={ChangeCheckBox} />
          <label
            htmlFor="Message"
            className="font-light text-gray-600 text-sm ml-1 dark:font-bold"
          >
            Inicio da Conversa
          </label>
        </div>
      </ConteinerDragg>

      {checkBox ? "" : <Handle type="source" position={Position.Left} />}

      <Handle type="target" position={Position.Right} />
    </>
  );
}
