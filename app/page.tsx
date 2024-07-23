"use client";

import Image from "next/image";
import ConteinerBox from "./Components/ConteinerBox";
import { useShallow } from "zustand/react/shallow";
import DarkMode from "./Redux/darkMode";
import { useEdges } from "reactflow";
import { useEffect, useState } from "react";

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
    <main className={`transition-all ${style}`}>
      <ConteinerBox></ConteinerBox>
    </main>
  );
}
