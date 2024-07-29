import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { motion } from "framer-motion";

export default function ConteinerDragg({ children, w }: any) {
  const springs = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
  });

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{duration:.1,ease:"easeOut"}}
      className={` ${
        w ? w : "w-56"
      } min-h-16  transition-all shadow-lg bg-white border-2 border-gray-200 rounded-2xl dark:bg-zinc-900 dark:text-white dark:border-zinc-900`}
    >
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
