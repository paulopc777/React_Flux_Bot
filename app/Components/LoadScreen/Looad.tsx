import React from "react";
import "../../load.css";

export default function Looad() {
  return (
    <div className="flex items-center justify-center w-screen h-screen absolute z-[2000]">
      <div className="w-full h-full transition-all bg-black opacity-60 absolute"></div>
      <div className=" w-fit h-fit !bg-zinc-50 ">
        <div className="loaderT bg-white">
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
}
