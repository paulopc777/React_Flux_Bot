import React from "react";
import { Children } from "react";
import { animated, useSpring } from "@react-spring/web";

export default function ConteinerDragg({ children }: any) {
  const springs = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
  });

  return (
    <animated.div
      style={{ ...springs }}
      className="w-56 min-h-16  shadow-lg bg-white border-2 border-gray-200 rounded-md dark:bg-zinc-900 dark:text-white dark:border-zinc-900"
    >
      <div className="p-4">{children}</div>
    </animated.div>
  );
}
