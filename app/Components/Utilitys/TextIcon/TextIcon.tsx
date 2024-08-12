import Image from "next/image";
import React from "react";

interface TextIconProps {
  text: string;
  icon: string;
}

export default function TextIcon({ text, icon }: TextIconProps) {
  return (
    <p className="flex items-center text-black dark:text-white">
      {" "}
      <Image
        src={icon}
        alt=""
        className="w-5 h-5 mr-1 "
        width={5}
        height={5}
      />{" "}
      {text}{" "}
    </p>
  );
}
