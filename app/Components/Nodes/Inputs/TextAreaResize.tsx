import useStore from "app/Redux/store";
import React, { useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

const selector = (state: any) => ({
  deleteValue: state.deleteValue,
  addValue: state.addValue,
  updateValue: state.updateValue,
});

export default function TextAreaResize({ id, change }: any) {
  const [Input, setInput] = useState("");
  const { deleteValue, addValue, updateValue } = useStore(useShallow(selector));

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const HandleChange = (e: any) => {
    setInput(e.target.value);

    change;
  };

  return (
    <textarea
      ref={textareaRef}
      placeholder="Mensagem"
      className="p-1 border-2  overflow-hidden dark:bg-neutral-800 w-full box-border resize-none h-auto border-1 rounded-lg dark:border-zinc-800 "
      value={Input}
      onChange={(e: any) => {
        HandleChange(e);
      }}
    />
  );
}
