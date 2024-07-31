"use client";


import ConteinerBox from "./Components/ConteinerBox";
import { MonichatApi } from "./Hooks/AuthMoniChat";

import DarkMode from "./Redux/darkMode";
import { useEffect, useState } from "react";
import { useShallow } from 'zustand/react/shallow'
import ErrorView, { selectError } from "./Redux/erroStore";

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
    console.log()
    if (Error.Visible) {
      setTimeout(() => {
        ToggleErrorVisibility();
      }, 4000);
    }
  }, [Error]);


  return (
    <main className={`transition-all ${style}`}>
      <ConteinerBox></ConteinerBox>
    </main>
  );
}
