import React from "react";

interface InputProsp {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  maxLength?: number;
}

export default function InputPad({
  placeholder,
  onBlur,
  onChange,
  value,
  maxLength,
}: InputProsp) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="p-1  my-3 dark:bg-neutral-800 w-full rounded-md border-2 border-zinc-200 border-opacity-50 dark:border-0 text-black dark:text-white"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      maxLength={maxLength}
    />
  );
}
