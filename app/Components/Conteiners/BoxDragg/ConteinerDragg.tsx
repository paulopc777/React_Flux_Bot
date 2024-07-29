import React from "react";
import { Children } from "react";
import { animated, useSpring } from "@react-spring/web";
import { waitUntilSymbol } from "next/dist/server/web/spec-extension/fetch-event";

export default function ConteinerDragg({ children, w }: any) {
  const springs = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
  });

  return (
    <animated.div
      className={` ${w ? w : "w-56"} min-h-16  transition-all shadow-lg bg-white border-2 border-gray-200 rounded-2xl dark:bg-zinc-900 dark:text-white dark:border-zinc-900`}
    >
      <div className="p-4">{children}</div>
    </animated.div>
  );
}
