import React from "react";
import { motion } from "framer-motion";

export default function ConteinerDragg({ children, w }: any) {

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      // whileTap={{ scale: 1.1 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className={` ${
        w ? w : "w-56"
      } min-h-16  transition-all shadow-lg bg-white border-2 border-gray-200 rounded-2xl dark:bg-zinc-900 dark:text-white dark:border-zinc-900 focus:border-green-500`}
    >
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
