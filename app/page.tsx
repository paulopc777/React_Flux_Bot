"use client";

// import ConteinerBox from "./Components/MainFlow";
import React, { Suspense } from "react";
import DarkMode from "./Redux/darkMode";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import ErrorView, { selectError } from "./Redux/erroStore";
// import ConteinerBox from "./Components/MainFlow";
import { useSearchParams } from "next/navigation";

const selector2 = (state: any) => ({
  dark: state.dark,
  toggleDarkMode: state.toggleDarkMode,
  setDarkMode: state.setDarkMode,
});

const ConteinerBox = React.lazy(() => import("./Components/MainFlow"));

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
      <Suspense >
        <ConteinerBox></ConteinerBox>
      </Suspense>
    </main>
  );
}
