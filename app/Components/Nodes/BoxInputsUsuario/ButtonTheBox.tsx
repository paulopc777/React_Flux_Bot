"use client";

import React, { useEffect, useState } from "react";
import ButtonBlakc from "../../Buttons/ButtonIcon";
import { Handle, Position } from "reactflow";
import useStore from "app/Redux/store";

interface idGetProps {
  id: string;
}

export default function RepostaButton() {
  const [InputsSetes, setInputsSetes] = useState([1]);
  const [ErroMessage, setErroMessage] = useState(false);


  function AddInputButton() {
    if (InputsSetes.length === 3) {
    } else {
      setInputsSetes([...InputsSetes, InputsSetes.length + 1]);
    }
  }

  useEffect(() => {
    console.log(InputsSetes);
  }, [InputsSetes]);

  return (
    <div className="min-h-16 h-fit  bg-white border-2 rounded-md border-gray-200  dark:bg-zinc-900 dark:text-white dark:border-zinc-900">
      <div id="Inputs">
        {InputsSetes.map((Identify, index) => (
          <div className="relative" key={index}>
            <input
              type="text"
              placeholder={`Messagem Botão ${Identify}`}
              id={`Identify${Identify}`}
              className="shadow-inner p-1 my-2 resize-in overflow-auto dark:bg-neutral-800 dark:text-white w-full"
            />
            <Handle id={`L-${index}`} type="source" position={Position.Left} />
            <Handle id={`R-${index}`} type="target" position={Position.Right} />
          </div>
        ))}
      </div>
      <div>
        <ButtonBlakc
          onclick={AddInputButton}
          icons={"svg/add.svg"}
          w={"mt-2 shadow-sm"}
        ></ButtonBlakc>
      </div>
    </div>
  );
}
