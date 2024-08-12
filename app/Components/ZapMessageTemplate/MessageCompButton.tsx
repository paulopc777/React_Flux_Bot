import React from "react";
import { Handle, Position } from "reactflow";

interface buttonProps {
  formattedText: string;
  Body: string;
  Foter: string;
}

export default function MessageCompButton({
  formattedText,
  Body,
  Foter,
}: buttonProps) {
  // console.log(buttonss)
  return (
    <div className="flex relative">
      <div className="text-[#313C42] absolute -left-[8px]">
        <svg
          viewBox="0 0 8 13"
          height="13"
          width="8"
          preserveAspectRatio="xMidYMid meet"
          className=""
          version="1.1"
          x="0px"
          y="0px"
          enable-background="new 0 0 8 13"
        >
          <title>tail-in</title>
          <path
            opacity="0.13"
            fill="#0000000"
            d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
          ></path>
          <path
            fill="currentColor"
            d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
          ></path>
        </svg>
      </div>

      <div className="max-w-60">
        {/* Mensagem */}
        <div className="bg-[#313C42] w-full  px-6 py-2 rounded-tr-xl rounded-b-xl text-white ">
          <p
            className="-translate-x-2"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          ></p>
        </div>
        {/* Cabeçalho */}
        <div className="bg-[#313C42] w-full px-6 py-2 rounded-xl text-white mt-1">
          <div>{Body}</div>
          <div>
            <p className="text-[.8rem] text-zinc-500">{Foter} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
