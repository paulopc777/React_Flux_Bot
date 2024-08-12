"use client";

import React, { useEffect, useState } from "react";
import ButtonBlakc from "../../Buttons/ButtonIcon";
import { Handle, Position } from "reactflow";
import useStore from "app/Redux/store";
import { useShallow } from "zustand/react/shallow";

interface idGetProps {
  id: string;
  ButtonInitial: any[];
}
const selector = (state: any) => ({
  deleteValue: state.deleteValue,
  addValue: state.addValue,
  updateValue: state.updateValue,
});

export default function RepostaButton({ id, ButtonInitial }: idGetProps) {
  //  estado inicial dos buttons
  //
  const [InputsSetes, setInputsSetes]: any = useState([ButtonInitial]);

  const { updateValue } = useStore(useShallow(selector));

  function AddInputButton() {
    if (InputsSetes.length === 3) {
    } else {
      const couter = InputsSetes.length + 1;
      setInputsSetes([...InputsSetes, { id: couter, text: "" }]);
    }
  }

  function UpadateValue() {
    updateValue(id, InputsSetes);
  }

  const handleEdit = (id: number, newText: any) => {
    setInputsSetes((prevInputs: any) =>
      prevInputs.map((input: any) =>
        input.id === id ? { ...input, text: newText } : input
      )
    );
  };

  useEffect(() => {
    UpadateValue();
  }, [InputsSetes]);

  return (
    <div className="min-h-16 h-full p-1  bg-white  border-gray-200 rounded-lg dark:bg-zinc-900 dark:text-white dark:border-zinc-900">
      <div id="Inputs">
        {InputsSetes.map((Identify: any, index: any) => (
          <div className="relative " key={index}>
            <input
              type="text"
              placeholder={`Messagem Botão ${Identify.id}`}
              id={`Identify${Identify.id}`}
              className="p-1 my-2 rounded-md resize-in overflow-auto dark:bg-neutral-800 dark:text-white w-full border-2 border-zinc-200 dark:border-neutral-800"
              value={Identify.text}
              onChange={(e: any) => {
                handleEdit(Identify.id, e.target.value);
              }}
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
