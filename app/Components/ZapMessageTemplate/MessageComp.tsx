import { Position } from "reactflow";
import React from "react";
import { Handle } from "reactflow";

export default function MessageCompZap({ formattedText }: any) {
  return (
    <div className="flex animation_Message pl-2 pr-4 pt-4 break-words">
      <div className="text-[#313C42]">
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
      <div className="bg-[#313C42] w-fit px-6 py-2 BoxMiniRunded text-white">
        <p
          className="-translate-x-2"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        ></p>
      </div>
      <Handle type="target" position={Position.Right} className="" />
    </div>
  );
}
