import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useEdges } from "reactflow";

interface AniamtionProsps {
  update: boolean;
}

export default function AnimationCont() {
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



  return (
    <div className="absolute w-screen h-screen  top-0 left-0 flex justify-center items-center z-40">
      <div className="w-full h-full bg-black opacity-45 absolute"></div>
      <div className="w-1/4 z-50">
        <p className="text-white">Criando seu Bot</p>
        <LinearProgress />
        <div className="text-center text-6xl mt-2">
          <p className={Engre}>⚙️</p>
          <p className={Chave}>🔨</p>
          <p className={Robot}>🤖</p>
        </div>
      </div>
    </div>
  );
}
