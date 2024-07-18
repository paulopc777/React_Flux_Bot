import useStore from "app/Redux/store";
import { useShallow } from "zustand/react/shallow";
import { MonichatApi } from "./AuthMoniChat";

async function VerifyIntencao(props: any) {
  let Intencao: any[] = [];

  props.edges.map((linhas: any) => {
    if (linhas.id === 1) {
      const Node = linhas.source;
    }
  });

  return;
}

export function ValidThoSend(props: any) {
  console.log(props);
}
