import InputPad from "app/Components/inputs/InputPad";
import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import useStore from "app/Redux/store";
import { useShallow } from "zustand/react/shallow";
import TextAreaResize from "./TextAreaResize";

const selector = (state: any) => ({
  updateValueDep: state.updateValueDep,
});

export default function DropDownInput({ VisibleDesk, id }: any) {
  const { updateValueDep } = useStore(useShallow(selector));
  const [InputValue, setInputValue] = useState("");

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    console.log(id);
    updateValueDep(`${id}`, e.target.value);
  };

  return (
    <>
      {VisibleDesk ? (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className=" w-full "
        >
          <InputPad
            placeholder="Mensagem de retorno"
            onBlur={() => {}}
            onChange={(e) => {
              handleInputChange(e);
            }}
            value={InputValue}
          ></InputPad>
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
}
