import useStore from "app/Redux/store";
import { useShallow } from "zustand/react/shallow";
import { MonichatApi } from "./AuthMoniChat";

const monichat = new MonichatApi();

async function CreateIntencaoContext(props: any) {
  props.edges.map((linhas: any) => {
    if (linhas.target === "1") {
      props.form.map((formText: any) => {
        if (formText.id === linhas.source) {
          monichat.InsertIntencao(
            formText.text,
            `@topic I-${formText.id} @intent inicio`
          );
        }
      });
    }
  });
}

async function CreateIntencaoNotContext(props: any) {
  props.edges.map((linhas: any) => {
    if (linhas.target === "1") {
      props.form.map((formPergunta: any) => {
        if (formPergunta.id === linhas.source) {
          props.edges.map((linhas2: any) => {
            if (linhas.source === linhas2.target) {
              props.form.map((formResposta: any) => {
                if (formResposta.id === linhas2.source) {
                  props.edges.map((linhas3: any) => {
                    if (linhas3.target === linhas2.source) {
                      props.form.map(async (Departamento: any) => {
                        if (Departamento.id === linhas3.source) {
                          const dataDepartamenot =
                            await monichat.ListDepartamento();

                          dataDepartamenot.map((Dp: any) => {
                            if (Dp.nome === Departamento.Departamento) {
                              monichat.InsertIntencao(
                                formPergunta.text,
                                formResposta.text,
                                Dp.id
                              );
                              console.log(
                                formPergunta.text,
                                formResposta.text,
                                Dp.id
                              );
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
    }
  });
}

async function ItentificaSePrecissaDeContexto(id: string, props: any) {
  let Confirm: boolean = true;

  await props.edges.map((linhas: any) => {
    if (id === linhas.target) {
      console.log("linhas.target");

      props.edges.map((linhas2: any) => {
        if (linhas.source === linhas2.target) {
          console.log("linhas2.target");
          props.form.map((formText: any) => {
            if (linhas2.source === formText.id) {
              console.log("linhas2.source");
              Confirm = false;
            }
          });
        }
      });
    }
  });

  return Confirm;
}

async function StartIntencao(props: any) {
  let Intencao: any[] = [];

  const response = await ItentificaSePrecissaDeContexto("2", props);

  if (!response) {
    CreateIntencaoNotContext(props);
  }
  console.log(response);

  return;
}

async function CreateContexts(prosp: any) {
  prosp.edges.map((linhas: any) => {
    if (linhas.target != "1") {
      prosp.form.map((formtext: any) => {
        if (formtext.id === linhas.source) {
          EncaminharDepartamento(linhas.target, prosp).then((data) => {
            if (data) {
              monichat.ListDepartamento().then((data) => {
                data.map((Departamentoitem: any) => {
                  if (Departamentoitem.nome === data) {
                    monichat.InsertContexto(
                      `I-${linhas.target}`,
                      formtext.text,
                      "@sys.input",
                      `@topic I-${linhas.target} @intent inicio`,
                      Departamentoitem.id
                    );

                    console.log(Departamentoitem.nome);
                  }
                });
              });
            } else {
              monichat.InsertContexto(
                `I-${linhas.target}`,
                formtext.text,
                "@sys.input",
                `@topic I-${linhas.target} @intent inicio`
              );
            }
          });
        }
      });
    }
  });

  console.log("Final CreateContexts");
  return;
}

async function EncaminharDepartamento(id: string, prosp: any) {
  let Departamento = "";

  prosp.edges.map((linhas: any) => {
    if (linhas.target == id) {
      prosp.form.map((Departamentos: any) => {
        if (Departamentos.id == linhas.source) {
          if (Departamentos) {
            Departamento = Departamentos.Departamento;
          }
        }
      });
    }
  });

  return Departamento;
}

export async function ValidThoSend(props: any) {
  console.log(props);
  StartIntencao(props);
  //await VerifyIntencao(props);
  //await CreateContexts(props);

  //const res = await EncaminharDepartamento("3", props);

  return;
}
