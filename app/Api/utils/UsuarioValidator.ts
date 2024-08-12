import { z } from "zod";

const exemple = "@sys.input";
const sysInputSchema = z.string().regex(/^\s*@sys\.input\s*$/);
const sysInputInclude = z.string().includes(exemple);

export function validateSysInput(text: string) {
  const result = sysInputSchema.safeParse(text);
  return result.success;
}

export function IncluedeSysInput(text: string) {
  try {
    const result = sysInputInclude.safeParse(text);

    if (result.success) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    // console.log(err);
    return false;
  }
}

export function verificarConexao(props: any) {
  let push: any = [];
  props.edges.forEach((linhas: any) => {
    if (linhas.target != "1") {
      // console.log("Pass 1 ");
      props.nodes.forEach((node: any) => {
        // console.log("Pass 2");
        if (linhas.target === node.id) {
          // console.log("Pass 3");
          if (node.type === "PerguntaUnique") {
            // console.log("Pass 4");
            props.nodes.forEach((node2: any) => {
              // console.log("Pass 5");
              if (node2.id === linhas.source) {
                // console.log("Pass 6");
                if (node2.type === "PerguntaUnique") {
                  // console.log("Pass 7");
                  push.push({
                    de: linhas.target,
                    para: linhas.source,
                    type: "PerguntaUnique",
                  });
                }
              }
            });
          }
        }
      });
    }
  });

  return push;
}
