"use client";

import React, { useEffect, useState } from "react";
import ButtonBlakc from "../Buttons/ButtonIcon";
import MenuAddCompo from "./MenuAddNode/MenuAddCompo";
import CircleInfo from "../Utilitys/Circle";
import { useShallow } from "zustand/react/shallow";
import useStore from "../../Redux/store";
import { initialNodes } from "../../InitialValue/nodes/nodes";
import AddMenuMore from "./MoreMenu/AddMenuMore";
import { ValidThoSend } from "app/Hooks/SendValidy";

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  formValues: state.formValues,
});

export default function HeaderNav() {
  const [Uptate, setUpdate] = useState(false);

  const { nodes, edges, formValues } = useStore(useShallow(selector));

  useEffect(() => {
    if (nodes.length != initialNodes.length) {
      setUpdate(true);
    }
  }, [nodes]);

  function Send() {
    console.log(nodes);
    console.log(edges);
    console.log(formValues);
    
  }

  return (
    <header className="w-64 h-screen fixed p-2 flex justify-center z-50">
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

      <AddMenuMore></AddMenuMore>
    </header>
  );
}
