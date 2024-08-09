import { LinearProgress } from "@mui/material";
import { useState } from "react";
import "../../../load.css";
export default function AnimationCont({ animation }: any) {
  const [Robot, setRobot] = useState("none");
  const [Engre, setEngre] = useState("engrenagem");
  const [Chave, setChave] = useState("none");

  function start() {
    if (Robot != "none") {
      setInterval(() => {
        setEngre("engrenagem");
        setRobot("none");
        setChave("none");
      }, 1000);
    }

    if (Engre != "none") {
      setInterval(() => {
        setEngre("none");
        setRobot("none");
        setChave("Chave");
      }, 1000);
    }

    if (Chave != "none") {
      setInterval(() => {
        setEngre("none");
        setRobot("BotInicial");
        setChave("none");
      }, 1000);
    }
  }

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
