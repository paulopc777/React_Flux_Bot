"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useShallow } from "zustand/react/shallow";
import useStore from "app/Redux/store";
import "react-quill/dist/quill.snow.css";

const selector = (state: any) => ({
  updateValueResposta: state.updateValueResposta,
});

interface InputProsp {
  placeholder: string;
  value: string;
  textareaRef: any;
  onChange: (e: any) => void;
  onBlur?: () => void;
  maxLength?: number;
}

export default function TextAreaResize({
  placeholder,
  onBlur,
  onChange,
  value,
  textareaRef,
  maxLength,
}: InputProsp) {
  const { updateValueResposta } = useStore(useShallow(selector));
  const [editorValue, setEditorValue] = useState("asd");

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
    }
  }, [value]);

  const handleChange = (value: any) => {
    setEditorValue(value);
  };
//  filter brightness -0 saturate-100 invert-100 sepia-0 saturate-1 hue-rotate-3deg) brightness-101 contrast-105;
  return (
    <div className=" break-words">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        className="h-fit dark:filter dark:brightness-[1000] dark:saturate-100 "
      />
    </div>
  );
}
