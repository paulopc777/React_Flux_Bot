"use client";

import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import TextIcon from "../../Utilitys/TextIcon/TextIcon";
import ConteinerDragg from "../../Conteiners/BoxDragg/ConteinerDragg";
import { BoxProps } from "../Client/PerguntaBox";
import Close from "../Close/Close";
import useStore from "app/Redux/store";
import { motion } from "framer-motion";
import OptRespostas from "./OptRespostas";
import zIndex from "@mui/material/styles/zIndex";
import RespostaPreview from "./RespostaPreview";
import BoxEdit, { selectView } from "app/Redux/EditMenuStore";
import MessageCompButton from "app/Components/ZapMessageTemplate/MessageCompButton";

const selector = (state: any) => ({
  deleteValue: state.deleteValue,
  addValue: state.addValue,
  updateValue: state.updateValue,
});

export default function RespostaBox({ id }: BoxProps) {
  const [Btn, setBtn] = useState(false);
  const [Edit, setEdit] = useState(false);
  const { deleteValue, addValue } = useStore(selector);
  const { SetVisible, SetBox, Visible, SelectItem } = BoxEdit(selectView);

  function ChangeBtn() {
    setBtn(!Btn);
    deleteValue(id);
  }

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
      <ConteinerDragg w={"w-92 max-w-80"}>
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
            <img src="/svg/edit.svg" className="w-full h-full" />
          </button>
        </motion.div>

        <RespostaPreview id={`${id}`}></RespostaPreview>
      </ConteinerDragg>

      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
    </>
  );
}
