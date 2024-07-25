"use client";

import ConteinerDragg from "app/Components/Conteiners/BoxDragg/ConteinerDragg";
import TextIcon from "app/Components/Nodes/TextUtility/TextIcon";
import { DroppSelectsMenu } from "app/Components/Utilitys/MenuDropDepartamento";
import { MonichatApi } from "app/Hooks/AuthMoniChat";
import React, { useEffect, useState } from "react";
import { MenuUsuario } from "./MenuUsuarios";

export default function InserirUsuario() {
  const [Nome, setNome] = useState("");
  const [Descricao, setDescricao] = useState("");
  const [Update, setUpdate] = useState(false);

  function setMenuOpt() {}
  function setMenu() {}

  function AddNewDepartament() {
    if (Nome.length > 0 && Descricao.length > 0) {
      const monichat = new MonichatApi().InsertDepartamento(Nome, Descricao);
      new MonichatApi().ListUsers();

      setNome("");
      setDescricao("");
    }
  }


  return (
    <ConteinerDragg w={"w-72"}>
      <TextIcon icon={"/svg/Departament.svg"} text={"Inserir Departamento"} />

      <MenuUsuario
        funcModi={setMenuOpt}
        close={() => {
          Update;
        }}
      />
    </ConteinerDragg>
  );
}
