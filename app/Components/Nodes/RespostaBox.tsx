"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import TextIcon from "./TextIcon/TextIcon";
import RepostaButton from "./User/ButtonTheBox";
import ConteinerDragg from "../Conteiners/BoxDragg/ConteinerDragg";
import { BoxProps } from "./User/PerguntaBox";
import Close from "./Close/Close";
import useStore from "app/Redux/store";
import { useShallow } from "zustand/react/shallow";
import InputPad from "./Inputs/InputPad";
import { Checkbox } from "@mui/material";
import TextAreaResize from "./Inputs/TextAreaResize";

const selector = (state: any) => ({
  deleteValue: state.deleteValue,
  addValue: state.addValue,
  updateValue: state.updateValue,
});

export default function RespostaBox({ id }: BoxProps) {
  const [Btn, setBtn] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { deleteValue, addValue } = useStore(useShallow(selector));

  const [Body, setBody] = useState("");
  const [Footer, setFoorter] = useState("");
  const [Message, setMessage] = useState("");

  function AutoSaveInput(e: any, type?: any) {
    if (Btn) {
      switch (type) {
        case 1:
          deleteValue(id);
          addValue({ id: id, Body: e, Footer: Footer, desc: Message });
          break;
        case 2:
          deleteValue(id);
          addValue({ id: id, Body: Body, Footer: e, desc: Message });
          break;
        case 3:
          deleteValue(id);
          addValue({ id: id, Body: Body, Footer: Footer, desc: e });
          break;
        default:
          break;
      }
      console.log(type)
    } else {
      deleteValue(id);
      addValue({ id: id, text: e });
    }
  }

  function ChangeBtn() {
    setBtn(!Btn);
    deleteValue(id);
  }

  return (
    <>
      <ConteinerDragg>
        <Close id={id}></Close>
        <TextIcon
          icon="svg/messageresponse.svg"
          text="Mensagem de Resposta"
        ></TextIcon>
        <hr className="my-2 bg-black text-black dark:border-zinc-500" />

        {Btn ? (
          <>
            <InputPad
              placeholder="Resposta"
              value={Message}
              onChange={(e) => {
                setMessage(e.target.value);
                AutoSaveInput(e.target.value,3);
              }}
            ></InputPad>
          </>
        ) : (
          ""
        )}

        {Btn ? (
          <InputPad
            placeholder="Mensagem do botão"
            value={Body}
            onChange={(e) => {
              setBody(e.target.value);
              AutoSaveInput(e.target.value,2);
            }}
            maxLength={20}
          ></InputPad>
        ) : (
          ""
        )}

        {Btn ? (
          <>
            <InputPad
              placeholder="Rodape do botão"
              value={Footer}
              onChange={(e) => {
                setFoorter(e.target.value);
                AutoSaveInput(e.target.value,1);
              }}
            ></InputPad>

            <hr className="my-2 bg-black text-black dark:border-zinc-500" />
          </>
        ) : (
          ""
        )}

        {Btn ? (
          <RepostaButton id={id} />
        ) : (
          <TextAreaResize
            onChange={(e: any) => {
              setInputValue(e.target.value);
              AutoSaveInput(e.target.value);
            }}
            placeholder="Mensagem de resposta"
            value={inputValue}
          ></TextAreaResize>
        )}

        <div className="-translate-x-3">
          <Checkbox
            onClick={ChangeBtn}
            color="success"
            className="translate-x-1"
          />
          <label htmlFor="Btn">Botões</label>
        </div>
      </ConteinerDragg>

      {Btn ? (
        <Handle type="source" position={Position.Left} />
      ) : (
        <>
          <Handle type="source" position={Position.Left} />
          <Handle type="target" position={Position.Right} />
        </>
      )}
    </>
  );
}
