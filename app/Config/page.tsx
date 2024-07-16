"use client";

import ConteinerDragg from "app/Components/Conteiners/BoxDragg/ConteinerDragg";
import TextIcon from "app/Components/Nodes/TextUtility/TextIcon";
import { DroppSelectsMenu } from "app/Components/Utilitys/MenuDrop";
import InsertDepartamento from "./Box/insertDepartamento";


export default function Home() {

  return (
    <main className="dark:bg-zinc-800 h-screen w-screen">
      <div className="p-10">
      <InsertDepartamento></InsertDepartamento>

      </div>
    </main>
  );
}
