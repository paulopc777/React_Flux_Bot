import { FormatText } from "../Validators/SendBackText";

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
      props.form.forEach((fm1: any) => {
        if (fm1.id === nd1.id) {
          if (fm1.text) {
            // Create Context com Texto Simples
            const Ftext = FormatText(fm1.text);

            monichat.InsertContexto(
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

            monichat.InsertContextoButton(
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
  props.edges.map((linhas: any) => {
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
                            props.form.map((textForm: any) => {
                              if (textForm.id === linhas.source) {
                                monichat.UpdataContext(
                                  `com${linhas.target}`,
                                  `@sys.opt @sys.array_must(${textForm.text}) @sys.opt`,
                                  `@topic com${linhas2.source} @intent inicio`
                                );
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
}
