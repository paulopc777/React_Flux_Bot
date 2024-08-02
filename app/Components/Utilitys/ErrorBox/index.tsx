import React from "react";
import Alert from "@mui/material/Alert";
import { motion } from "framer-motion";

export interface AlertProps {
  Text: string;
  Visible: boolean;
  Type?: string;
  ErrorImg?: string;
}
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, y: "-1400px" },
};

export default function AlertBox({
  Text,
  Visible,
  Type,
  ErrorImg,
}: AlertProps) {
  return (
    <motion.div
      animate={Visible ? "open" : "closed"}
      variants={variants}
      className="w-fit min-w-64 max-w-80 absolute bottom-0 mb-4 ml-4  h-fit z-20"
    >
      <Alert
        variant="filled"
        color={Type}
        severity="warning"
        className="h-fit break-words"
      >
        <b>{Text}</b>
        {/* <div
          className="absolute w-5 -right-2 -top-2 hover:bg-red-500 rounded-full transition-all"
          onClick={onClose}
        >
          <img src="/svg/Close.svg" alt="" />
        </div> */}

        {ErrorImg ? (
          <img src={ErrorImg} alt="" />
        ) : (
          <>
            <br></br>
            <small className="hover:text-green-500 text-zinc-300">
              <a href="">Leias as Docs</a>
            </small>
          </>
        )}
      </Alert>
    </motion.div>
  );
}
