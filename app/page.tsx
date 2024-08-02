"use client";

import ConteinerBox from "./Components/ConteinerBox";
import DarkMode from "./Redux/darkMode";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import ErrorView, { selectError } from "./Redux/erroStore";
import OptRespostas from "./Components/Nodes/BoxResposta/OptRespostas";

const selector2 = (state: any) => ({
  dark: state.dark,
  toggleDarkMode: state.toggleDarkMode,
});

export default function Home() {
  const { dark, toggleDarkMode } = DarkMode(useShallow(selector2));
  const { Error, ToggleErrorVisibility } = ErrorView(useShallow(selectError));

  const [style, setStyle] = useState("");

  useEffect(() => {
    if (dark) {
      setStyle("dark");
    } else {
      setStyle("");
    }
  }, [dark]);

  useEffect(() => {
    // console.log(Error.Visible);
    if (Error.Visible) {
      setTimeout(() => {
        ToggleErrorVisibility();
      }, 6000);
    }
  }, [Error]);

  return (
    <main className={`transition-all ${style}`}>


      <ConteinerBox></ConteinerBox>
    </main>
  );
}
