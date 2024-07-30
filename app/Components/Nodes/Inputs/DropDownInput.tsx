import InputPad from "app/Components/Nodes/Inputs/InputPad";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useStore from "app/Redux/store";
import { useShallow } from "zustand/react/shallow";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";

const selector = (state: any) => ({
  updateValueDep: state.updateValueDep,
});

export default function DropDownInput({ VisibleDesk, id }: any) {
  const { updateValueDep } = useStore(useShallow(selector));
  const [InputValue, setInputValue] = useState("");
  const addEmoji = (emoji: any) => () => setInputValue(`${InputValue}${emoji}`);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    console.log(id);
    updateValueDep(`${id}`, e.target.value);
  };

  useEffect(() => {
    updateValueDep(`${id}`, InputValue);
  }, [InputValue]);

  return (
    <>
      {VisibleDesk ? (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className=" w-full "
        >
          <Textarea
            placeholder="Mensagem de retorno"
            className="dark:!bg-neutral-800 dark:!text-white dark:!border-0"
            value={InputValue}
            onChange={(event) => handleInputChange(event)}
            minRows={2}
            maxRows={4}
            startDecorator={
              <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
                <IconButton
                  variant="outlined"
                  color="neutral"
                  onClick={addEmoji("{contact_name}")}
                  className="text_button_small dark:!text-white hover:dark:!bg-neutral-600"
                >
                  Nome do cliente
                </IconButton>
                <IconButton
                  variant="outlined"
                  color="neutral"
                  onClick={addEmoji("{ticket_number}")}
                    className="text_button_small dark:!text-white hover:dark:!bg-neutral-600"
                >
                  número do ticket
                </IconButton>
                <IconButton
                  variant="outlined"
                  color="neutral"
                  onClick={addEmoji("😊")}
                    className="text_button_small dark:!text-white hover:dark:!bg-neutral-600"
                >
                  😊
                </IconButton>
              </Box>
            }
            endDecorator={
              <Typography level="body-xs" sx={{ ml: "auto" }}>
                {InputValue.length} character(s)
              </Typography>
            }
            sx={{ minWidth: 150 }}
          />

          {/* <InputPad
            placeholder="Mensagem de retorno"
            onBlur={() => {}}
            onChange={(e) => {
              handleInputChange(e);
            }}
            value={InputValue}
          ></InputPad> */}
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
}
