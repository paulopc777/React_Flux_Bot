"use client";
import useStore from "app/Redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

const selector = (state: any) => ({
  updateValueResposta: state.updateValueResposta,
});

interface InputProsp {
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  onBlur?: () => void;
  maxLength?: number;
}

export default function TextAreaResize({
  placeholder,
  onBlur,
  onChange,
  value,
  maxLength,
}: InputProsp) {
  const { updateValueResposta } = useStore(useShallow(selector));

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      placeholder="Mensagem"
      className="p-1 border-2  overflow-hidden dark:bg-neutral-800 w-full box-border resize-none h-auto border-1 rounded-lg dark:border-zinc-800 "
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
}
