import useStore from "app/Redux/store";
import React, { useCallback, useEffect, useState } from "react";
import InputPad from "../Inputs/InputPad";
import { motion } from "framer-motion";
import TextAreaResize from "../Inputs/TextAreaResize";
import { Box, Tooltip } from "@mui/material";
import IconButton from "@mui/joy/IconButton";
import { useShallow } from "zustand/react/shallow";
import BoxEdit, { selectView } from "app/Redux/EditMenuStore";
import ButtonBlakc from "../../Buttons/ButtonIcon";
import Image from "next/image";

const selector = (state: any) => ({
  formValues: state.formValues,
  deleteValue: state.deleteValue,
  addValue: state.addValue,
});

const ButtonOptStyle =
  "text_button_small dark:!text-white hover:dark:!bg-neutral-400 dark:!border-neutral-400 !min-w-fit dark:text-black";

export default function OptRespostas() {
  const { formValues, deleteValue, addValue } = useStore(useShallow(selector));
  const { SelectItem, Visible, SetVisible } = BoxEdit(selectView);

  const [Btn, setBtn] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [Body, setBody] = useState("");
  const [Footer, setFoorter] = useState("");
  const [Message, setMessage] = useState("");
  const [InputsSetes, setInputsSetes]: any = useState([{ id: "1", text: "" }]);

  function AutoSaveInput() {
    if (Btn) {
      console.log("Btn exec");
      deleteValue(SelectItem);
      addValue({
        id: SelectItem,
        Body: Body,
        Footer: Footer,
        desc: Message,
        button: InputsSetes,
      });
    } else {
      deleteValue(SelectItem);
      addValue({ id: SelectItem, text: inputValue });
    }
  }

  const addEmoji = (emoji: any) => () => setInputValue(`${inputValue}${emoji}`);

  const addEmojiMessage = useCallback(
    (emoji: any) => () => setMessage(`${Message}${emoji}`),
    [Message]
  );

  function ChangeBtn() {
    setBtn(!Btn);
  }

  function Clear() {
    setInputValue("");
    setBody("");
    setFoorter("");
    setMessage("");
    setBtn(false);
  }

  function AddInputButton() {
    if (InputsSetes.length === 3) {
    } else {
      const couter = InputsSetes.length + 1;
      setInputsSetes([...InputsSetes, { id: couter, text: "" }]);
    }
  }

  const handleEdit = (id: number, newText: any) => {
    setInputsSetes((prevInputs: any) =>
      prevInputs.map((input: any) =>
        input.id === id ? { ...input, text: newText } : input
      )
    );
  };

  const Update = useCallback(() => {
    let text = "";
    let B = "";
    let F = "";
    let M = "";
    let button: any = "";
    Clear();

    if (formValues) {
      formValues.forEach((item: any) => {
        if (item.id === SelectItem) {
          if (item.text) {
            text = item.text;
          }
          if (item.Body) {
            B = item.Body;
            F = item.Footer;
            M = item.desc;
            button = item.button;
            setBtn(true);
          }
        }
      });
    }

    if (button.length <= 0) {
      button = [{ id: 1, text: "" }];
    }

    setInputsSetes(button);
    setInputValue(text);
    setBody(B);
    setFoorter(F);
    setMessage(M);
  }, [SelectItem, formValues]);

  useEffect(() => {
    Update();
  }, [Update]);

  return (
    <div className="bg-white p-2  border-2 border-zinc-200 rounded-2xl w-72 max-h-[90vh] h-fit mb-2 overflow-auto shadow-xl z-20 dark:bg-zinc-900 dark:border-neutral-600 dark:text-white">
      {Btn ? (
        <>
          <>
            <motion.div className="  ">
              <div className="w-full flex justify-end">
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className=" rounded-lg relative right-0 dark:bg-zinc-200 w-fit mb-2"
                >
                  <button
                    className="px-2 border-zinc-200 border-2 rounded-lg hover:border-zinc-400 "
                    onClick={() => {
                      SetVisible(false);
                    }}
                  >
                    <p className="text-right text-black dark:text-white font-bold">
                      x
                    </p>
                  </button>
                </motion.div>
              </div>

              <div className="mb-2 overflow-x-scroll dark:text-white">
                <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmojiMessage("{contact_name}")}
                    className={ButtonOptStyle}
                  >
                    Nome do cliente
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmojiMessage("{ticket_number}")}
                    className={ButtonOptStyle}
                  >
                    número do ticket
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmojiMessage("{my_name}")}
                    className={ButtonOptStyle}
                  >
                    Nome do Usuario
                  </IconButton>
                </Box>
              </div>

              <TextAreaResize
                placeholder="Mensagem de retorno"
                value={Message}
                onChange={(e) => {
                  setMessage(e);
                }}
              />
            </motion.div>
          </>
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
            }}
          ></InputPad>

          <hr className="my-2 bg-black text-black dark:border-zinc-500" />
        </>
      ) : (
        ""
      )}

      {Btn ? (
        <div className="min-h-16  p-2  bg-white  border-gray-200 rounded-lg dark:bg-zinc-900 dark:text-white dark:border-zinc-900 ">
          <div id="Inputs">
            {InputsSetes.map((Identify: any, index: any) => (
              <div className="relative " key={index}>
                <input
                  type="text"
                  placeholder={`Messagem Botão ${Identify.id}`}
                  id={`Identify${Identify.id}`}
                  className=" p-1 my-2 rounded-md resize-in overflow-auto dark:bg-neutral-800 dark:text-white w-full border-2 border-zinc-200 dark:border-neutral-800"
                  value={Identify.text}
                  onChange={(e: any) => {
                    handleEdit(Identify.id, e.target.value);
                  }}
                />
              </div>
            ))}
          </div>
          <div>
            <ButtonBlakc
              onclick={AddInputButton}
              icons={"svg/add.svg"}
              w={"mt-2 shadow-sm"}
            ></ButtonBlakc>
          </div>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className=" w-full  "
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
                setInputValue(e);
              }}
            />
          </motion.div>
        </>
      )}

      <div className="flex items-center w-full justify-between">
        <div className="flex justify-start items-center gap-1">
          <button
            onClick={ChangeBtn}
            color="success"
            className="p-2 border-2 border-zinc-300 rounded-lg shadow-sm w-fit hover:text-blue-500 hover:border-blue-500 transition-all duration-500"
          >
            <label htmlFor="Btn">Usar Botões</label>
          </button>
        </div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className=" hover_fill p-2 border-2 border-zinc-300 rounded-lg shadow-sm w-fit my-2 flex items-center"
          onClick={AutoSaveInput}
        >
          <Image
            src="/svg/save.svg"
            alt="save"
            className="w-5 h-5"
            width={5}
            height={5}
          />
          <p>Salvar</p>
        </motion.div>
      </div>
    </div>
  );
}
