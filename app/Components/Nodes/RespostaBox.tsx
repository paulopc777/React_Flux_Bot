"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import TextIcon from "./TextIcon/TextIcon";
import RepostaButton from "./User/ButtonTheBox";
import ConteinerDragg from "../Conteiners/BoxDragg/ConteinerDragg";
import { BoxProps } from "./User/PerguntaBox";
import Close from "./Close/Close";
import useStore from "app/Redux/store";
import { useShallow } from "zustand/react/shallow";
import InputPad from "./Inputs/InputPad";
import TextAreaResize from "./Inputs/TextAreaResize";
import { Box, Checkbox } from "@mui/material";
import IconButton from "@mui/joy/IconButton";
import { Textarea, Typography } from "@mui/joy";
import { motion } from "framer-motion";

const selector = (state: any) => ({
  deleteValue: state.deleteValue,
  addValue: state.addValue,
  updateValue: state.updateValue,
});

const ButtonOptStyle =
  "text_button_small dark:!text-white hover:dark:!bg-neutral-600 dark:!border-neutral-600 !min-w-fit";

export default function RespostaBox({ id }: BoxProps) {
  const [Btn, setBtn] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { deleteValue, addValue } = useStore(useShallow(selector));
  const addEmoji = (emoji: any) => () => setInputValue(`${inputValue}${emoji}`);
  const [Body, setBody] = useState("");
  const [Footer, setFoorter] = useState("");
  const [Message, setMessage] = useState("");

  function AutoSaveInput(e: any, type?: any) {
    if (Btn) {
      switch (type) {
        case 3:
          deleteValue(id);
          addValue({ id: id, Body: Body, Footer: Footer, desc: e });
          break;
        case 2:
          deleteValue(id);
          addValue({ id: id, Body: e, Footer: Footer, desc: Message });
          break;
        case 1:
          deleteValue(id);
          addValue({ id: id, Body: Body, Footer: e, desc: Message });
          break;
        default:
          break;
      }
      console.log(type);
    } else {
      setInputValue(e);
      deleteValue(id);
      addValue({ id: id, text: e });
    }
  }

  function ChangeBtn() {
    setBtn(!Btn);
    deleteValue(id);
  }

  useEffect(() => {}, [inputValue]);

  return (
    <>
      <ConteinerDragg>
        <Close id={id}></Close>
        <TextIcon
          icon="svg/messageresponse.svg"
          text="Mensagem de Resposta"
        ></TextIcon>

        {Btn ? (
          <>
            <InputPad
              placeholder="Resposta"
              value={Message}
              onChange={(e) => {
                setMessage(e.target.value);
                AutoSaveInput(e.target.value, 3);
              }}
            ></InputPad>
          </>
        ) : (
          ""
        )}

        {Btn ? (
          <InputPad
            placeholder="Mensagem do botão"
            value={Body}
            onChange={(e) => {
              setBody(e.target.value);
              AutoSaveInput(e.target.value, 2);
            }}
            maxLength={20}
          ></InputPad>
        ) : (
          ""
        )}

        {Btn ? (
          <>
            <InputPad
              placeholder="Rodape do botão"
              value={Footer}
              onChange={(e) => {
                setFoorter(e.target.value);
                AutoSaveInput(e.target.value, 1);
              }}
            ></InputPad>

            <hr className="my-2 bg-black text-black dark:border-zinc-500" />
          </>
        ) : (
          ""
        )}

        {Btn ? (
          <RepostaButton id={id} />
        ) : (
          <>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className=" w-full "
            >
              <div className="mb-2 overflow-x-scroll">
                <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("{contact_name}")}
                    className={ButtonOptStyle}
                  >
                    Nome do cliente
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("{ticket_number}")}
                    className={ButtonOptStyle}
                  >
                    número do ticket
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("{my_name}")}
                    className={ButtonOptStyle}
                  >
                    Nome do Usuario
                  </IconButton>
                </Box>
              </div>

              <Textarea
                placeholder="Mensagem de retorno"
                className="dark:!bg-neutral-800 dark:!text-white dark:!border-0 max-h-28"
                value={inputValue}
                onChange={(e) => {
                  AutoSaveInput(e.target.value);
                }}
                minRows={2}
                maxRows={4}
                sx={{ minWidth: 150 }}
              />
            </motion.div>
          </>
        )}

        <div className="-translate-x-3">
          <Checkbox
            onClick={ChangeBtn}
            color="success"
            className="translate-x-1"
          />
          <label htmlFor="Btn">Botões</label>
        </div>
      </ConteinerDragg>

      {Btn ? (
        <Handle type="source" position={Position.Left} />
      ) : (
        <>
          <Handle type="source" position={Position.Left} />
          <Handle type="target" position={Position.Right} />
        </>
      )}
    </>
  );
}
