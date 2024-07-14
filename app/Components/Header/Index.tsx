"use client";

import React, { useEffect, useState } from "react";
import ButtonBlakc from "../Buttons/ButtonIcon";
import MenuAddCompo from "./MenuAddCompo";
import CircleInfo from "../Utilitys/Circle";
import { useShallow } from "zustand/react/shallow";
import useStore from "../../Redux/store";
import { initialNodes } from "../../InitialValue/nodes/nodes";

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export default function HeaderNav() {
  const [addMenu, setaddMenu] = useState(false);

  const [Uptate, setUpdate] = useState(false);

  function onVisibleAddMenu() {
    setaddMenu(!addMenu);
  }

  const { nodes, edges } = useStore(useShallow(selector));

  useEffect(() => {
    if (nodes.length != initialNodes.length ) {
      setUpdate(true);
    } 
  }, [nodes]);

  function Send() {
    console.log(nodes);
    console.log(edges);
  }

  return (
    <header className="w-64 h-screen fixed p-2 flex justify-center shadow-md bg-white dark:bg-zinc-700 z-50">
      <div className="flex gap-2">
        <ButtonBlakc text="Add" icons={"svg/undo.svg"}></ButtonBlakc>

        <div className="flex items-center border-1 border-gray-200 rounded-2xl shadow-inner dark:bg-white h-10">
          <ButtonBlakc
            text="Add"
            icons={"svg/notSave.svg"}
            onclick={Send}
          ></ButtonBlakc>

          <CircleInfo Visible={Uptate}></CircleInfo>

          {Uptate ? (
            <p className="mx-2">Save Info</p>
          ) : (
            <p className="mx-2">Info Save</p>
          )}
        </div>
      </div>

      <MenuAddCompo></MenuAddCompo>
    </header>
  );
}
