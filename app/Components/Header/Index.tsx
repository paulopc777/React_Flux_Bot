"use client";

import React, { useEffect, useState } from "react";
import ButtonBlakc from "../Buttons/ButtonIcon";
import MenuAddCompo from "./MenuAddNode/MenuAddCompo";
import CircleInfo from "../Utilitys/Circle";
import { useShallow } from "zustand/react/shallow";
import useStore from "../../Redux/store";
import DarkMode from "../../Redux/darkMode";
import { initialNodes } from "../../InitialValue/nodes/nodes";
import AddMenuMore from "./MoreMenu/AddMenuMore";
import { ValidThoSend } from "app/Hooks/SendValidy";
import LinearProgress from "@mui/material/LinearProgress";
import AnimationCont from "./SendAnimation";

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  formValues: state.formValues,
});

const selector2 = (state: any) => ({
  dark: state.dark,
  toggleDarkMode: state.toggleDarkMode,
});

export default function HeaderNav() {
  const [Uptate, setUpdate] = useState(false);

  const { nodes, edges, formValues } = useStore(useShallow(selector));
  const { dark, toggleDarkMode } = DarkMode(useShallow(selector2));

  const [updateLoad, setupdateLoad] = useState(false);

  useEffect(() => {
    if (nodes.length != initialNodes.length) {
      setUpdate(true);
    }
  }, [nodes]);

  function execAnimacao() {
    if (Uptate) {
    }
  }

  function Send() {
    setupdateLoad(true);

    ValidThoSend({ nodes: nodes, edges: edges, form: formValues }).then((res) =>
      setupdateLoad(false)
    );
  }

  function setDarkClikc() {
    toggleDarkMode();
  }

  return (
    <header className="w-64 h-screen fixed p-2 flex justify-center z-50">
      {updateLoad ? <AnimationCont></AnimationCont> : ""}
      <div className="flex gap-2 w-full justify-center">
        <ButtonBlakc text="Add" icons={"svg/undo.svg"}></ButtonBlakc>
        {dark ? (
          <ButtonBlakc
            text="Add"
            icons={"svg/ligh.svg"}
            onclick={setDarkClikc}
          />
        ) : (
          <ButtonBlakc
            text="Add"
            icons={"svg/dark.svg"}
            onclick={setDarkClikc}
          />
        )}

        <div className="flex items-center border-1 border-gray-200 rounded-2xl shadow-inner dark:bg-white h-10 bg-white">
          <ButtonBlakc
            text="Add"
            icons={"svg/notSave.svg"}
            onclick={Send}
          ></ButtonBlakc>

          <CircleInfo Visible={Uptate}></CircleInfo>

          {Uptate ? (
            <p className="mx-2 bg-white">Save</p>
          ) : (
            <p className="mx-2 bg-white">Save</p>
          )}
        </div>
      </div>

      <MenuAddCompo></MenuAddCompo>

      <AddMenuMore></AddMenuMore>
    </header>
  );
}
