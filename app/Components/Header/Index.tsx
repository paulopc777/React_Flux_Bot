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
import { motion } from "framer-motion";
import ButtonIcon from "../Buttons/ButtonIcon";
import ErrorView, { ErrorState, selectError } from "app/Redux/erroStore";
import { verificarConexao } from "app/Hooks/Validators/UsuarioValidator";
import { ValidInitialNode } from "app/Hooks/Validators/InitialValidator";

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  formValues: state.formValues,
});

const selector2 = (state: any) => ({
  dark: state.dark,
  toggleDarkMode: state.toggleDarkMode,
});

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

export default function HeaderNav() {
  const [Uptate, setUpdate] = useState(false);

  const { nodes, edges, formValues } = useStore(useShallow(selector));
  const { dark, toggleDarkMode } = DarkMode(useShallow(selector2));
  const [isOpen, setIsOpen] = useState(false);
  const { Error, SetNewError } = ErrorView(useShallow(selectError));
  const [animation, setupdateLoad] = useState(false);

  useEffect(() => {
    if (nodes.length != initialNodes.length) {
      setUpdate(true);
    }
  }, [nodes]);

  async function Send() {
    const dados = {
      nodes: nodes,
      edges: edges,
      form: formValues,
    };
    let data: any[] = verificarConexao(dados);

    if (data.length > 0) {
      const ErroSend: ErrorState = {
        Text: "Mensagem de usuario não pode ser subsequente a uma mesma Mensagem de usuario",
        Visible: true,
        ErrorImg: "",
      };
      if (!Error.Visible) {
        SetNewError(ErroSend);
      }

      return;
    }

    data = ValidInitialNode(dados);

    // console.log(data);

    if (data.length <= 0) {
      const ErroSend: ErrorState = {
        Text: "E nessesario uma espera para Mensagem inicial !",
        Visible: true,
        ErrorImg: "/Error/initialnode1.gif",
        Type: "error",
      };
      if (!Error.Visible) {
        SetNewError(ErroSend);
      }
      return;
    }

    ValidThoSend({ nodes: nodes, edges: edges, form: formValues });

    // setInterval(() => {
    //   setupdateLoad(false);
    // }, 10000);
  }

  function setDarkClikc() {
    toggleDarkMode();
  }

  return (
    <header className="w-fit h-fit fixed p-2 flex justify-center z-50">
      {/* Loading Send Bot */}

      <AnimationCont animation={animation}></AnimationCont>

      <div className="flex gap-2 w-full justify-center h-fit">
        <ButtonBlakc
          text="Add"
          icons={"svg/add.svg"}
          onclick={() => {
            setIsOpen(!isOpen);
          }}
        ></ButtonBlakc>
        <AddMenuMore></AddMenuMore>

        {/* Dark Mode Button */}

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

      <motion.div
        className="absolute top-16 mx-"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      >
        <MenuAddCompo visible={true}></MenuAddCompo>
      </motion.div>
    </header>
  );
}
