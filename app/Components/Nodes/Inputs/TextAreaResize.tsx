
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface InputProsp {
  placeholder: string;
  value: string;
  textareaRef?: any;
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

  return (
    <div className="break-words">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        className="h-fit dark:filter dark:brightness-[1] "
      />
    </div>
  );
}
