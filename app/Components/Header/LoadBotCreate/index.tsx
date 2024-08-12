import { LinearProgress } from "@mui/material";
import { useState } from "react";
import "../../../load.css";
export default function AnimationCont({ animation }: any) {
  let style = "hidden";

  if (animation) {
    style = "flex";
  }

  return (
    <div
      className={`absolute w-screen h-screen  top-0 left-0  justify-center items-center z-40 ${style} `}
    >
      <div className="bg-black opacity-75 w-screen h-screen absolute top-0"></div>
      <div className="flex justify-center items-center flex-col">
        <div className="item">
          <i className="loader --5"></i>
        </div>
      </div>

      <div className="loader"></div>
    </div>
  );
}
