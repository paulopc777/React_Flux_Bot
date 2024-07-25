import React from "react";
import TextIcon from "../../Nodes/TextUtility/TextIcon";
import { useShallow } from "zustand/react/shallow";
import useStore from "../../../Redux/store";
import { GetScreenCenter } from "./LogycMenu";

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode, // Adicione isso ao estado
});

export default function MenuAddCompo() {
  const { nodes, addNode } = useStore(useShallow(selector));

  const handleAddNode = (type: string) => {
    // Cria um novo nó com um id único
    const newNode = {
      id: `${nodes.length + 1}`,
      type: type,
      data: { label: `Node ${nodes.length + 1}` },
      position: GetScreenCenter(), // Posição aleatória
    };
    addNode(newNode); // Função para adicionar o nó ao estado
  };

  return (
    <div
      className={
        "w-5/6 h-fit p-2 absolute z-20 shadow-lg  rounded-md  dark:bg-zinc-900 top-20 bg-zinc-100 "
      }
    >
      <ul className="w-full flex flex-col gap-y-2 text-black dark:text-white">
        <li
          className=" rounded-md bg-white  border-2 border-opacity-45 border-zinc-300 dark:border-0   py-4 px-3 shadow-sm cursor-pointer  dark:bg-zinc-800 dark:hover:bg-zinc-700"
          onClick={() => {
            handleAddNode("PerguntaUnique");
          }}
        >
          <TextIcon
            text="Mensagem cliente"
            icon="svg/messagerec.svg"
          ></TextIcon>
        </li>

        <li
          className=" rounded-md bg-white  border-2 border-opacity-45 border-zinc-300 dark:border-0   py-4 px-3 shadow-sm cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700"
          onClick={() => {
            handleAddNode("Resposta");
          }}
        >
          <TextIcon text="Resposta" icon="svg/messageresponse.svg"></TextIcon>
        </li>

        <li
          className=" rounded-md bg-white  border-2 border-opacity-45 border-zinc-300 dark:border-0   py-4 px-3 shadow-sm cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700"
          onClick={() => {
            handleAddNode("Departamento");
          }}
        >
          <TextIcon
            text="Transferir para Departamento"
            icon="svg/Departament.svg"
          ></TextIcon>
        </li>

        <li
          className=" rounded-md bg-white  border-2 border-opacity-45 border-zinc-300 dark:border-0   py-4 px-3 shadow-sm cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700"
          onClick={() => {
            handleAddNode("Usuario");
          }}
        >
          <TextIcon
            text="Transferir para Usuario"
            icon="svg/user.svg"
          ></TextIcon>
        </li>



        <li
          className=" rounded-md bg-white  border-2 border-opacity-45 border-zinc-300 dark:border-0  py-4 px-3 shadow-sm cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700"
          onClick={() => {
            handleAddNode("Timmer");
          }}
        >
          <TextIcon text="Aguarda Tempo" icon="svg/Clock.svg"></TextIcon>
        </li>
      </ul>
    </div>
  );
}
