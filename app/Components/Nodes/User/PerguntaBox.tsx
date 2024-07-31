"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Handle, Position } from "reactflow";
import TextIcon from "../TextIcon/TextIcon";
import useStore from "../../../Redux/store";
import ConteinerDragg from "../../Conteiners/BoxDragg/ConteinerDragg";
import Close from "../Close/Close";
import InputPad from "../Inputs/InputPad";
import { useShallow } from "zustand/react/shallow";
import { Box, Checkbox } from "@mui/material";
import IconButton from "@mui/joy/IconButton";
import { Textarea, Typography } from "@mui/joy";

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
  const [checkBox, setCheckBox] = useState(false);
  const [InputValue, setInputValue] = useState("");
  const { deleteValue, addValue, formValues } = useStore(useShallow(selector));
  const addEmoji = (emoji: any) => () => setInputValue(`${InputValue}${emoji}`);

  function AutoSaveInput() {
    //console.log("Save");
    deleteValue(id);
    addValue({ id: id, text: InputValue });
  }

  function ChangeCheckBox() {
    setCheckBox(!checkBox);
  }

  useEffect(() => {
    if (id != "1") {
      AutoSaveInput();
    }
  }, [InputValue]);

  return (
    <>
      <ConteinerDragg w={"w-62"}>
        {data.start ? "" : <Close id={id} />}

        <TextIcon
          icon="svg/messagerec.svg"
          text="Mensagem do Usuairo"
        ></TextIcon>

        {data.start ? (
          ""
        ) : (
          <>
            <div className="text-white mt-4">
              <div className="mb-1">
                <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("@sys.input")}
                    className="text_button_small dark:!text-white hover:dark:!bg-neutral-600 dark:!border-neutral-600 "
                  >
                    Qual quer texto
                  </IconButton>
                </Box>
              </div>

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
            </div>
          </>
        )}

        {data.start ? (
          <div className=" flex items-center ">
            <Checkbox checked defaultChecked color="success" />

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
