"use client";

import React, { useEffect, useState } from "react";
import ButtonBlakc from "../Buttons/ButtonIcon";
import MenuAddCompo from "./Menu/MenuAddCompo";
import CircleInfo from "../Utilitys/Circle";
import { useShallow } from "zustand/react/shallow";
import useStore from "../../Redux/store";
import DarkMode from "../../Redux/darkMode";
import { initialNodes } from "../../InitialValue/nodes/nodes";
import AddMenuMore from "../Buttons/ButtonAddMenu/AddMenuMore";
import AnimationCont from "./LoadBotCreate";
import { motion } from "framer-motion";
import ErrorView, { ErrorState, selectError } from "app/Redux/erroStore";
import {
  IncluedeSysInput,
  verificarConexao,
} from "app/Api/utils/UsuarioValidator";
import {
  ComparaElemento,
  ValidInitialNode,
} from "app/Api/utils/InitialValidator";
import BoxEdit, { selectView } from "app/Redux/EditMenuStore";
import { NewSend, UpdateValues } from "app/Api/NewSendValidy";
import { MonichatApi } from "app/Api/AuthMoniChat";

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
  const { nodes, edges, formValues } = useStore(useShallow(selector));
  const { dark, toggleDarkMode } = DarkMode(useShallow(selector2));
  const { Error, SetNewError } = ErrorView(useShallow(selectError));
  const { SetVisible, Visible } = BoxEdit(useShallow(selectView));

  const [Uptate, setUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [animation, setupdateLoad] = useState(false);
  let monichat: MonichatApi = new MonichatApi();

  useEffect(() => {
    if (nodes) {
      if (nodes.length != initialNodes.length) {
        setUpdate(true);
      }
    }
  }, [nodes]);

  useEffect(() => {
    if (Visible) {
      setIsOpen(false);
    }
  }, [Visible]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      monichat.SetToken(token);
    } else {
    }
  }, [nodes]);

  function Valid() {
    const dados = {
      nodes: nodes,
      edges: edges,
      form: formValues,
    };

    let data: any = verificarConexao(dados);

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

    data = IncluedeSysInput("@sys");

    if (data) {
      const ErroSend: ErrorState = {
        Text: "O texto @sys e reservado para o sistema removao !",
        Visible: true,
        ErrorImg: "/Error/initialnode1.gif",
        Type: "error",
      };
      if (!Error.Visible) {
        SetNewError(ErroSend);
      }
      return;
    }

    return;
  }

  async function Send() {
    setupdateLoad(true);

    const oldValues = localStorage.getItem("Flow");
    const Token = localStorage.getItem("token");

    if (oldValues) {
      if (Token) {
        const r = await UpdateValues(
          oldValues,
          { nodes: nodes, edges: edges, form: formValues },
          Token,
          monichat
        );
        if (!r) {
          console.log("Send data new ");
          setupdateLoad(true);
          const res = await NewSend(
            {
              nodes: nodes,
              edges: edges,
              form: formValues,
            },
            monichat
          );
          //
          if (res) {
            setupdateLoad(false);
          } else {
            setupdateLoad(false);
            console.log("Erro ");
          }
          //
        } else {
          console.log("Send data Update");
        }
        setupdateLoad(false);
      }
    }
  }

  function setDarkClikc() {
    toggleDarkMode();
  }

  // useEffect(() => {
  //   Valid();
  // }, [edges, nodes, formValues]);

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
            SetVisible(false);
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

          {/* Seve Text Button */}
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
