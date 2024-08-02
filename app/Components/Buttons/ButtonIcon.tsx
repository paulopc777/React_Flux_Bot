import { motion } from "framer-motion";
import React from "react";

interface ButtonProsp {
  icons: string;
  text?: string;
  onclick?:() => void
  w?: string;
}

export default function ButtonIcon({ text, w, icons, onclick }: ButtonProsp) {
  return (
    <motion.div
      className={`bg-[#2fac66] rounded-xl shadow-sm hover:bg-slate-700 transition-all w-10 p-1 h-10 cursor-pointer  ${w} `}
      onClick={onclick}
      whileTap={{ scale: 0.8 }}
    >
      <img src={`${icons}`} alt="Add" className="w-full p-1 " />
    </motion.div>
  );
}
