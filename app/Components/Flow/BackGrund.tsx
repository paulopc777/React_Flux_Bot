import React from "react";
import { Background, BackgroundVariant } from "reactflow";

export default function BackgroundFlow() {
  return (
    <Background
      color="bg-white"
      variant={BackgroundVariant.Dots}
      size={2}
      className="opacity-80"
      gap={50}
    />
  );
}
