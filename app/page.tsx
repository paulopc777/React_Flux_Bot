"use client";

import ConteinerBox from "./Components/MainFlow";
import DarkMode from "./Redux/darkMode";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import ErrorView, { selectError } from "./Redux/erroStore";

const selector2 = (state: any) => ({
  dark: state.dark,
  toggleDarkMode: state.toggleDarkMode,
  setDarkMode: state.setDarkMode,
});

export default function Home() {
  const { dark, toggleDarkMode, setDarkMode } = DarkMode(useShallow(selector2));
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
    if (Error.Visible) {
      setTimeout(() => {
        ToggleErrorVisibility();
      }, 6000);
    }
  }, [Error]);

  useEffect(() => {
    if (localStorage) {
      const getInitialDarkMode = (): boolean => {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode === "true" || false;
      };
      setDarkMode(getInitialDarkMode());
    }
  }, []);

  return (
    <main className={`transition-all ${style}`}>
      <ConteinerBox></ConteinerBox>
    </main>
  );
}
