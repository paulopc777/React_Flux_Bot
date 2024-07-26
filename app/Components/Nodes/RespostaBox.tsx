"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import TextIcon from "../Nodes/TextUtility/TextIcon";
import RepostaButton from "./BoxInputsUsuario/ButtonTheBox";
import ConteinerDragg from "../Conteiners/BoxDragg/ConteinerDragg";
import { BoxProps } from "./BoxInputsUsuario/PerguntaBox";
import Close from "./Close/Close";
import useStore from "app/Redux/store";
import { useShallow } from "zustand/react/shallow";
import InputPad from "../inputs/InputPad";
import { Checkbox } from "@mui/material";

const selector = (state: any) => ({
  deleteValue: state.deleteValue,
  addValue: state.addValue,
  updateValue: state.updateValue,
});

export default function RespostaBox({ id }: BoxProps) {
  const [Btn, setBtn] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { deleteValue, addValue, updateValue } = useStore(useShallow(selector));

  const [Body, setBody] = useState("");
  const [Footer, setFoorter] = useState("");
  const [Message, setMessage] = useState("");

  function AutoSaveInput() {
    //console.log("Save");

    if (Btn) {
      //console.log("Update Butoon");
      deleteValue(id);
      addValue({ id: id, Body: Body, Footer: Footer, desc: Message });
    } else {
      deleteValue(id);
      addValue({ id: id, text: inputValue });
    }
  }

  function ChangeBtn() {
    setBtn(!Btn);
    deleteValue(id);
  }

  //useEffect(() => {}, [inputValue]);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
    }
  }, [inputValue]);

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
              }}
              onBlur={AutoSaveInput}
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
            }}
            onBlur={AutoSaveInput}
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
              }}
              onBlur={AutoSaveInput}
            ></InputPad>

            <hr className="my-2 bg-black text-black dark:border-zinc-500" />
          </>
        ) : (
          ""
        )}

        {Btn ? (
          <RepostaButton id={id} />
        ) : (
          <textarea
            ref={textareaRef}
            placeholder="Mensagem"
            className="shadow-inner p-1 border-2  overflow-hidden dark:bg-neutral-800 w-full box-border resize-none h-auto border-1 rounded-lg dark:border-zinc-800 "
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onBlur={AutoSaveInput}
          />
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
