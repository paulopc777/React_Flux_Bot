"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import TextIcon from "../Nodes/TextUtility/TextIcon";
import RepostaButton from "./BoxInputsUsuario/ButtonTheBox";
import ConteinerDragg from "../Conteiners/BoxDragg/ConteinerDragg";
import { BoxProps } from "./BoxInputsUsuario/PerguntaBox";
import Close from "./Close/Close";
import { useTransition, animated } from "@react-spring/web";
import useStore from "app/Redux/store";

export default function RespostaBox({ id }: BoxProps) {
  const [Btn, setBtn] = useState(false);
  const [textArea, setTextearea] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { removeEdgesByNodeId } = useStore();

  function ChangeBtn() {
    setBtn(!Btn);
  }

  const transitions = useTransition(Btn, {
    from: { transform: "translateY(0%)", opacity: 0 },
    enter: { transform: "translateY(0%)", opacity: 1 },
    leave: {
      transform: "translateY(-100%)",
      opacity: 0,
      display: "none",
      position: "absolute",
    },
    config: { duration: 300 },
  });

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
          <RepostaButton />
        ) : (
          <textarea
            ref={textareaRef}
            placeholder="Mensagem"
            className="shadow-inner p-1 my-4 overflow-hidden dark:bg-neutral-800 w-full box-border resize-none h-auto "
            value={textArea}
            onChange={(e) => setTextearea(e.target.value)}
          />
        )}

        <hr className="my-2 bg-black text-black" />

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
