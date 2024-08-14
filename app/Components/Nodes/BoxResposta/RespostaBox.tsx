import React from "react";
import { Handle, Position } from "reactflow";
import TextIcon from "../../Utilitys/TextIcon/TextIcon";
import { BoxProps } from "../Client/PerguntaBox";
import Close from "../Close/Close";
import { motion } from "framer-motion";
import RespostaPreview from "./RespostaPreview";
import BoxEdit, { selectView } from "app/Redux/EditMenuStore";
import Image from "next/image";

export default function RespostaBox({ id }: BoxProps) {
  const { SetVisible, SetBox, Visible, SelectItem } = BoxEdit(selectView);

  function VisibleMenu() {
    if (SelectItem === id && Visible) {
      SetVisible(false);
      SetBox("");
    } else {
      SetVisible(true);
      SetBox(id);
    }
  }

  return (
    <>
      <div className="min-h-16  max-w-80 transition-all shadow-lg bg-white border-2 border-gray-200 rounded-2xl dark:bg-zinc-900 dark:text-white dark:border-zinc-900 focus:border-green-500">
        <div className="p-4">
          <Close id={id}></Close>
          <TextIcon
            icon="svg/messageresponse.svg"
            text="Mensagem de Resposta"
          ></TextIcon>

          <motion.div
            whileTap={{ scale: 0.8 }}
            className="w-7 h-7 mt-2 rounded-lg relative right-0 dark:bg-zinc-200"
            onClick={VisibleMenu}
          >
            <button className="p-1 border-zinc-200 border-2 rounded-lg ">
              <img src="/svg/edit.svg" className="w-full h-full" alt="edit" />
            </button>
          </motion.div>

          <RespostaPreview id={`${id}`}></RespostaPreview>
          <Handle type="source" position={Position.Left} id="d" />
        </div>
      </div>

      {/* <Handle type="source" position={Position.Left} /> */}
    </>
  );
}
