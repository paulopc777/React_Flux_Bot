"use client";

import DarkMode from "app/Redux/darkMode";
import InsertDepartamento from "./Box/Departamento/insertDepartamento";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import InserirUsuario from "./Box/Usuario/inserirUsuarios";

const selector2 = (state: any) => ({
  dark: state.dark,
  toggleDarkMode: state.toggleDarkMode,
});

export default function Home() {
  const { dark, toggleDarkMode } = DarkMode(useShallow(selector2));

  const [style, setStyle] = useState("");

  useEffect(() => {
    if (dark) {
      setStyle("dark");
    } else {
      setStyle("");
    }
  }, [dark]);

  return (
    <div className={`dark:bg-zinc-800 h-screen w-screen p-1 ${style}`}>
      <div className="p-10 flex gap-2">
        <InsertDepartamento></InsertDepartamento>
        <InserirUsuario></InserirUsuario>
      </div>
    </div>
  );
}
