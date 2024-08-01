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
import { Box, Checkbox, ToggleButton, ToggleButtonGroup } from "@mui/material";
import IconButton from "@mui/joy/IconButton";
import { Textarea, Typography } from "@mui/joy";
import { motion } from "framer-motion";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";

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
  const [selectedText, setSelectedText] = useState("");

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
  const [formats, setFormats] = React.useState(() => ["bold", "italic"]);

  const handleFormat = (event: any, newFormats: any) => {
    setFormats(newFormats);
  };
  const textareaRef: any = useRef(null);

  const handleBoldClick = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = inputValue.slice(start, end);

      if (selectedText) {
        const boldText = `<b>${selectedText}</b>`;
        const newText =
          inputValue.slice(0, start) + boldText + inputValue.slice(end);
        setInputValue(newText);
      }
    }
  };

  return (
    <>
      <ConteinerDragg w={"w-92"}>
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
              className=" w-full  max-w-72"
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

              <TextAreaResize
                placeholder="Mensagem de retorno"
                value={inputValue}
                onChange={(e) => {
                  AutoSaveInput(e);
                }}
                textareaRef={textareaRef}
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
