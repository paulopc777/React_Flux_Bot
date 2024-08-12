"use client";

// import ConteinerBox from "./Components/MainFlow";
import React from "react";
import DarkMode from "./Redux/darkMode";
import { Suspense, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import ErrorView, { selectError } from "./Redux/erroStore";
import { MonichatApi } from "./Api/AuthMoniChat";
import useStore from "./Redux/store";
import { StoreSelector } from "./Redux/Selector/storeSelector";
import ConteinerBox from "./Components/MainFlow";
import { useRouter } from "next/router";

const selector2 = (state: any) => ({
  dark: state.dark,
  toggleDarkMode: state.toggleDarkMode,
  setDarkMode: state.setDarkMode,
});

export default function Home() {
  const { dark, toggleDarkMode, setDarkMode } = DarkMode(useShallow(selector2));
  const { Error, ToggleErrorVisibility } = ErrorView(useShallow(selectError));
  const [style, setStyle] = useState("");
  const router = useRouter();
  
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

  useEffect(() => {
    // Verifica se a URL está carregada e se o token está presente

    if (router.isReady) {
      const token: any = router.query.token;

      if (token) {
        localStorage.setItem("token", token);
      }
    }
  }, [router.isReady, router.query]);

  return (
    <main className={`transition-all ${style}`}>
      <ConteinerBox></ConteinerBox>
    </main>
  );
}
