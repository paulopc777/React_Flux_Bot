"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Handle, Position } from "reactflow";
import TextIcon from "./../TextUtility/TextIcon";
import useStore from "../../../Redux/store";
import ConteinerDragg from "../../Conteiners/BoxDragg/ConteinerDragg";
import Close from "../Close/Close";
import { useShallow } from "zustand/react/shallow";
import InputPad from "../../inputs/InputPad";

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

const selector = (state: any) => ({
  deleteValue: state.deleteValue,
  addValue: state.addValue,
  formValues: state.formValues,
});

export default function PerguntaBox({ id, data }: DataProps) {
  const [checkBox, setCheckBox] = useState(false);
  const [InputValue, setInputValue] = useState("");
  const { deleteValue, addValue, formValues } = useStore(useShallow(selector));

  function AutoSaveInput() {
    //console.log("Save");
    deleteValue(id);
    addValue({ id: id, text: InputValue });
  }

  function ChangeCheckBox() {
    setCheckBox(!checkBox);
  }

  return (
    <>
      <ConteinerDragg>
        {data.start ? "" : <Close id={id} />}

        <TextIcon
          icon="svg/messagerec.svg"
          text="Mensagem do Usuairo"
        ></TextIcon>

        {data.start ? (
          ""
        ) : (
          <InputPad
            placeholder="Mensagem"
            value={InputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onBlur={AutoSaveInput}
          ></InputPad>
        )}

        {data.start ? (
          <div className=" flex items-center ">
            <input type="checkbox" name="Message" checked={true} id={id} />
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
