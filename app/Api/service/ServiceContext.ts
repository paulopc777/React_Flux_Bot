import { FormatText } from "../utils/SendBackText";

const NodeList = {
  PerguntaUnique: "PerguntaUnique",
  Resposta: "Resposta",
  Departamento: "Departamento",
  Timmer: "Timmer",
  Usuario: "Usuario",
};

export async function CreateContext(props: any, monichat: any) {
  props.nodes.forEach((nd1: any) => {
    if (nd1.type === NodeList.Resposta) {
      props.form.forEach(async (fm1: any) => {
        if (fm1.id === nd1.id) {
          if (fm1.text) {
            // Create Context com Texto Simples
            const Ftext = FormatText(fm1.text);

            await monichat.InsertContexto(
              `com${nd1.id}`,
              Ftext,
              `@sys.opt @sys.array_must(sair,exit) @sys.opt`,
              `Ok ! so um segundo estou finalizando seu atendimento !`
            );
          } else if (fm1.button) {
            // Criando Comtexto com Botões
            let BtnArray: any = [];
            const Ftext = FormatText(fm1.desc);

            fm1.button.map((item: any) => {
              if (item.text) {
                BtnArray.push(item.text);
              }
            });

            await monichat.InsertContextoButton(
              `com${fm1.id}`,
              "@sys.input ",
              `@topic com${fm1.id} @intent inicio`,
              `${Ftext}`,
              BtnArray,
              "",
              fm1.Body,
              fm1.Footer
            );
          }
        }
      });
    }
  });
}

export async function LinkContexts(props: any, monichat: any) {
  let data: any = [];

  await props.edges.map((linhas: any) => {
    if (linhas.target != "1") {
      props.nodes.map((nodeType: any) => {
        if (linhas.target === nodeType.id) {
          if (nodeType.type === "Resposta") {
            props.nodes.map((nodeType2: any) => {
              if (nodeType2.id === linhas.source) {
                if (nodeType2.type === "PerguntaUnique") {
                  props.edges.map((linhas2: any) => {
                    if (linhas2.target === linhas.source) {
                      props.nodes.map((nodeType3: any) => {
                        if (linhas2.source === nodeType3.id) {
                          if (
                            nodeType3.type != "Departamento" &&
                            nodeType3.type != "Usuario"
                          ) {
                            props.form.map(async (textForm: any) => {
                              if (textForm.id === linhas.source) {
                                data.push({
                                  "1": `com${linhas.target}`,
                                  "2": `@sys.opt @sys.array_must(${textForm.text}) @sys.opt`,
                                  "3": `@topic com${linhas2.source} @intent inicio`,
                                });
                              }
                            });
                          }
                        }
                      });
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  });

  return data;
}
export async function LinkContext2(props: any, monichat: any) {
  let data: any = [];
  await props.edges.forEach((l1: any) => {
    if (l1.target != "1") {
      props.nodes.forEach((nd1: any) => {
        if (nd1.id === l1.target && nd1.type === NodeList.Resposta) {
          // console.log("Pass 1");
          props.edges.forEach((l2: any) => {
            if (l1.source === l2.target) {
              props.nodes.forEach((n2: any) => {
                if (
                  l2.target === n2.id &&
                  n2.type === NodeList.PerguntaUnique
                ) {
                  // console.log("Pass 2");
                  props.nodes.forEach((n3: any) => {
                    if (l2.source == n3.id && n3.type === NodeList.Resposta) {
                      console.log("Pass 3");
                      props.form.forEach(async (fr1: any) => {
                        if (fr1.id === l2.target) {
                          console.log("Pass 4 " + l1.target + ": " + fr1.text);
                          data.push({
                            "de": `com${l1.target}`,
                            "com": `@sys.opt @sys.array_must(${fr1.text}) @sys.opt`,
                            "para": `@topic com${n3.id} @intent inicio`,
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });

  return data;
}
