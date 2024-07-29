"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Handle, Position } from "reactflow";
import TextIcon from "./../TextUtility/TextIcon";
import useStore from "../../../Redux/store";
import ConteinerDragg from "../../Conteiners/BoxDragg/ConteinerDragg";
import Close from "../Close/Close";
import InputPad from "../../inputs/InputPad";
import { useShallow } from "zustand/react/shallow";
import { Checkbox } from "@mui/material";

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
          <>
            <div className="text-white mt-4">
              <InputPad
                placeholder="Mensagem esoperada"
                onBlur={() => {
                  AutoSaveInput();
                }}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                value={InputValue}
              ></InputPad>
            </div>
          </>
        )}

        {data.start ? (
          <div className=" flex items-center ">

            <Checkbox checked defaultChecked color="success" />

            <label
              htmlFor="Message"
              className="font-light text-gray-600 text-sm ml-1 dark:font-bold -translate-x-2"
            >
              Inicio da Conversa
            </label>
          </div>
        ) : (
          ""
        )}
      </ConteinerDragg>

      {data.start ? "" : <Handle type="source" position={Position.Left}  />}

      <Handle type="target" position={Position.Right} />
    </>
  );
}
