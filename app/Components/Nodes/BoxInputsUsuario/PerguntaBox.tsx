"use client";

import React, { useMemo, useState } from "react";
import { Handle, Position } from "reactflow";
import TextIcon from "./../TextUtility/TextIcon";
import useStore from "../../../Redux/store";
import ConteinerDragg from "../../Conteiners/BoxDragg/ConteinerDragg";
import Close from "../Close/Close";

export interface BoxProps {
  id: string;
  start?: boolean;
}

interface DataProps {
  id: string;
  data: {
    label: string;
    start: boolean;
    sourceHandles: [];
    targetHandles: [];
  };
}

export default function PerguntaBox({ id, data }: DataProps) {
  const [checkBox, setCheckBox] = useState(false);

  function ChangeCheckBox() {
    setCheckBox(!checkBox);
  }

  return (
    <>
      <ConteinerDragg>
        {data.start ?  "" : <Close id={id} />}

        <TextIcon
          icon="svg/messagerec.svg"
          text="Mensagem do Usuairo"
        ></TextIcon>

        {data.start ? (
          ""
        ) : (
          <input
            type="text"
            placeholder="Mensagem"
            className="p-1 shadow-inner my-4 dark:bg-neutral-800 w-full"
          />
        )}

        {data.start ? (
          <div className=" flex items-center ">
            <input type="checkbox" name="Message" checked={true} />
            <label
              htmlFor="Message"
              className="font-light text-gray-600 text-sm ml-1 dark:font-bold"
            >
              Inicio da Conversa
            </label>
          </div>
        ) : (
          ""
        )}
      </ConteinerDragg>

      {data.start ? "" : <Handle type="source" position={Position.Left} />}

      <Handle type="target" position={Position.Right} />
    </>
  );
}
