import React from "react";
import TextIcon from "../../Utilitys/TextIcon/TextIcon";
import { useShallow } from "zustand/react/shallow";
import useStore from "../../../Redux/store";
import { StoreSelector } from "app/Redux/Selector/storeSelector";
import { MenuItems } from "./MenuConfigs";
import { MenuItemProps } from "./MenuConfigs";
import { Tooltip } from "@mui/material";

export default function MenuAddCompo(visible: any) {
  const { nodes, addNode } = useStore(useShallow(StoreSelector));

  const handleAddNode = (type: string, e: any) => {
    const ultimoNode = nodes[nodes.length - 1].id;
    const position = nodes[nodes.length - 1].position;

    const idThoint = parseInt(ultimoNode) + 1;

    const newNode = {
      id: `${idThoint}`,
      type: type,
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: position.x + 300, y: position.y }, // Posição aleatória
    };
    addNode(newNode); // Função para adicionar o nó ao estado
  };
  const onDragStart = (event: any, nodeType: any) => {
    // console.log('DragStarte')
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div
      className={
        "w-5/6 h-fit p-2 mx-auto  shadow-lg  rounded-md  dark:bg-zinc-900 top-20 bg-zinc-100   "
      }
    >
      <ul className="w-full flex flex-col gap-y-2 text-black dark:text-white">
        {MenuItems.map((item: MenuItemProps, index) => {
          return (
            <Tooltip title={item.Esplicacao} placement="right" key={index}>
              <li
                className=" rounded-md bg-white  border-2 border-opacity-45 border-zinc-300 dark:border-0   py-4 px-3 shadow-sm cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700"
                onClick={(e) => {
                  handleAddNode(item.TypeBox, e);
                }}
                onDragStart={(e) => {
                  onDragStart(e, item.TypeBox);
                }}

                draggable
              >
                <TextIcon text={item.Title} icon={item.icon}></TextIcon>
              </li>
            </Tooltip>
          );
        })}
      </ul>
    </div>
  );
}
