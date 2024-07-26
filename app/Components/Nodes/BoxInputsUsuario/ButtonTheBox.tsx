"use client";

import React, { useEffect, useState } from "react";
import ButtonBlakc from "../../Buttons/ButtonIcon";
import { Handle, Position } from "reactflow";
import useStore from "app/Redux/store";
import { useShallow } from "zustand/react/shallow";

interface idGetProps {
  id: string;
}
const selector = (state: any) => ({
  deleteValue: state.deleteValue,
  addValue: state.addValue,
  updateValue: state.updateValue,
});

export default function RepostaButton({ id }: idGetProps) {
  const [InputsSetes, setInputsSetes] = useState([{ id: 1, text: "" }]);
  const [ErroMessage, setErroMessage] = useState(false);
  const { deleteValue, addValue, updateValue } = useStore(useShallow(selector));

  function AddInputButton() {
    if (InputsSetes.length === 3) {
    } else {
      const couter = InputsSetes.length + 1;
      setInputsSetes([...InputsSetes, { id: couter, text: "" }]);
    }
  }

  const handleEdit = (id: number, newText: any) => {
    setInputsSetes((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, text: newText } : input
      )
    );
  };

  function DispachRedux() {
    updateValue(id, InputsSetes);
  }

  useEffect(() => {
    // console.log(InputsSetes);
  }, [InputsSetes]);

  return (
    <div className="min-h-16 h-full p-1  bg-white border-gray-200 rounded-lg dark:bg-zinc-900 dark:text-white dark:border-zinc-900">
      <div id="Inputs">
        {InputsSetes.map((Identify: any, index) => (
          <div className="relative " key={index}>
            <input
              type="text"
              placeholder={`Messagem Botão ${Identify.id}`}
              id={`Identify${Identify.id}`}
              className="shadow-inner p-1 my-2 rounded-md resize-in overflow-auto dark:bg-neutral-800 dark:text-white w-full"
              value={Identify.text}
              onChange={(e: any) => {
                handleEdit(Identify.id, e.target.value);
              }}
              onBlur={DispachRedux}
            />

           
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
