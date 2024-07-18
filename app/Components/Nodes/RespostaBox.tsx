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

  function AutoSaveInput() {
    console.log("Save");

    if (Btn) {
      console.log("Update Butoon");
      deleteValue(id);
      addValue({ id: id, Body: Body, Footer: Footer });
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
          <input
            type="text"
            className="shadow-inner p-1 mb-2 overflow-hidden dark:bg-neutral-800 w-full box-border resize-none h-auto "
            placeholder="Mensagem do botão"
            maxLength={20}
            value={Body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            onBlur={AutoSaveInput}
          />
        ) : (
          ""
        )}

        {Btn ? (
          <>
            <input
              type="text"
              className="shadow-inner p-1  overflow-hidden dark:bg-neutral-800 w-full box-border resize-none h-auto "
              placeholder="Rodape do botão"
              maxLength={20}
              value={Footer}
              onChange={(e) => {
                setFoorter(e.target.value);
              }}
              onBlur={AutoSaveInput}
            />
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
            className="shadow-inner p-1  overflow-hidden dark:bg-neutral-800 w-full box-border resize-none h-auto "
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onBlur={AutoSaveInput}
          />
        )}

        <div>
          <input type="checkbox" onClick={ChangeBtn} />
          <label htmlFor="Btn">Botões</label>
        </div>
      </ConteinerDragg>

      {Btn ? (
        ""
      ) : (
        <>
          <Handle type="source" position={Position.Left} />
          <Handle type="target" position={Position.Right} />
        </>
      )}
    </>
  );
}
