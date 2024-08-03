"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Handle, Position } from "reactflow";
import TextIcon from "../../Utilitys/TextIcon/TextIcon";
import useStore from "../../../Redux/store";
import ConteinerDragg from "../../Conteiners/BoxDragg/ConteinerDragg";
import Close from "../Close/Close";
import { useShallow } from "zustand/react/shallow";
import { Box, Checkbox } from "@mui/material";
import IconButton from "@mui/joy/IconButton";
import { Textarea, Typography } from "@mui/joy";
import { motion } from "framer-motion";
import {
  IncluedeSysInput,
  validateSysInput,
} from "app/Api/Validators/UsuarioValidator";
import ErrorView, { ErrorState, selectError } from "app/Redux/erroStore";

export interface BoxProps {
  id: string;
  start?: boolean;
}

interface DataProps {
  id: string;
  data: {
    label: string;
    start: boolean;
    sourceHandles: [];
    targetHandles: [];
  };
}

const selector = (state: any) => ({
  deleteValue: state.deleteValue,
  addValue: state.addValue,
  formValues: state.formValues,
});

export default function PerguntaBox({ id, data }: DataProps) {
  const [InputVisible, setInputVisible] = useState(false);
  const [InputValue, setInputValue] = useState("");
  const { deleteValue, addValue, formValues } = useStore(useShallow(selector));
  const { Error, SetNewError } = ErrorView(useShallow(selectError));

  const addEmoji = (emoji: any) => () => {
    if (InputValue.indexOf("@sys.input") != -1) {
      setInputValue("");
      ChangeColor("");
    } else {
      setInputValue(`${InputValue}${emoji}`);
      ChangeColor(`${InputValue}${emoji}`);
    }
  };

  const [SelectClick, setSelectClikc] = useState("outlined");

  function AutoSaveInput() {
    //console.log("Save");
    deleteValue(id);
    addValue({ id: id, text: InputValue });
  }

  const ChangeColor = (text: string) => {
    // console.log(text.indexOf("@sys.input"));

    if (text.indexOf("@sys.input") != -1) {
      setSelectClikc("solid");
    } else {
      setSelectClikc("outlined");
    }
  };

  useEffect(() => {
    if (id != "1") {
      if (SelectClick === "solid") {
        if (!validateSysInput(InputValue)) {
          if (!Error.Visible) {
            const ErroSend: ErrorState = {
              Text: "O @sys.input e um parametro unico",
              Visible: true,
              ErrorImg: "",
            };
            SetNewError(ErroSend);
          }
          setInputValue("@sys.input");
        }
      } else {
        if (IncluedeSysInput(InputValue)) {
          const ErroSend: ErrorState = {
            Text: "O @sys.input e um parametro reservado para o sistema",
            Visible: true,
            ErrorImg: "",
          };
          SetNewError(ErroSend);
          setInputValue("");
        }
      }
      AutoSaveInput();
    }
  }, [InputValue]);

  return (
    <>
      <ConteinerDragg w={"w-62"}>
        {data.start ? "" : <Close id={id} />}
        {data.start ? (
          ""
        ) : (
          <TextIcon
            icon="svg/messagerec.svg"
            text="Mensagem cliente"
          ></TextIcon>
        )}

        {/* <div className="bg-[#00B30C] h-full w-2 absolute left-0 top-0 rounded-s-full shadow-inner  border-[#24922b] border-r-2"></div> */}

        {data.start ? (
          ""
        ) : (
          <>
            <div className="text-white mt-4">
              <div className="mb-1">
                <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
                  <IconButton
                    variant={SelectClick}
                    color="success"
                    onClick={addEmoji("@sys.input")}
                    className="text_button_small dark:!text-white hover:dark:!bg-neutral-600 dark:!border-neutral-600 "
                  >
                    Qual quer texto
                  </IconButton>
                </Box>
              </div>
              <div
                className="text-zinc-500 py-1 cursor-pointer"
                onClick={() => {
                  setInputVisible(!InputVisible);
                }}
              >
                <p className="text-[.7rem] hover:text-zinc-400 ">
                  Mensagem de Personalizada {InputVisible ? "🔼" : "🔽"}
                </p>
              </div>

              {InputVisible ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className=" w-full "
                >
                  <Textarea
                    placeholder="Mensagem de retorno"
                    className="dark:!bg-neutral-800 dark:!text-white dark:!border-0 max-h-28"
                    value={InputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                    minRows={2}
                    maxRows={4}
                    sx={{ minWidth: 150 }}
                  />
                </motion.div>
              ) : (
                ""
              )}
            </div>
          </>
        )}

        {data.start ? (
          <div className=" flex items-center ">
            <div className="h-7 w-7 mr-2">
              <img src="/svg/play.svg" alt="" className="w-full h-full" />
            </div>

            <label
              htmlFor="Message"
              className="font-light text-gray-600 text-sm ml-1 dark:font-bold -translate-x-2"
            >
              Inicio da Conversa
            </label>
          </div>
        ) : (
          ""
        )}
      </ConteinerDragg>

      {data.start ? "" : <Handle type="source" position={Position.Left} />}

      <Handle type="target" position={Position.Right} />
    </>
  );
}
