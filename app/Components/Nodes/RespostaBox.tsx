"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import TextIcon from "../TextUtility/TextIcon";
import RepostaButton from "./BoxInputsUsuario/ButtonTheBox";
import ConteinerDragg from "../Conteiners/BoxDragg/ConteinerDragg";
import { BoxProps } from "./BoxInputsUsuario/PerguntaBox";
import Close from "./Close/Close";

export default function RespostaBox({ id }: BoxProps) {
  const [Btn, setBtn] = useState(false);
  const [textArea, setTextearea] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function ChangeBtn() {
    setBtn(!Btn);
  }

  useEffect(() => {

    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
    }
  }, [textArea]);

  return (
    <>
      <ConteinerDragg>
        <Close id={id}></Close>
        <TextIcon
          icon="svg/messageresponse.svg"
          text="Mensagem de Resposta"
        ></TextIcon>

        {Btn ? (
          ""
        ) : (
          <textarea
            ref={textareaRef}
            placeholder="Mensagem"
            className=" shadow-inner p-1 my-4 overflow-hidden dark:bg-neutral-800 w-full box-border resize-none h-auto"
            value={textArea}
            onChange={(e) => {
              setTextearea(e.target.value);
            }}
          />
        )}

        <hr className="my-2 bg-black text-black" />

        <div>
          <input type="checkbox" onClick={ChangeBtn} />
          <label htmlFor="Btn">Botões</label>
        </div>

        {Btn ? <RepostaButton /> : ""}
      </ConteinerDragg>

      {Btn ? (
        ""
      ) : (
        <>
          {" "}
          <Handle type="source" position={Position.Left} />
          <Handle type="target" position={Position.Right} />
        </>
      )}
    </>
  );
}
