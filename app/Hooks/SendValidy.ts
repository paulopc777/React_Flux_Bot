import { MonichatApi } from "./AuthMoniChat";

const monichat = new MonichatApi();

/**
 * Cria um Intenção Linkada a um Contexto
 * @param props Array com Textos do Formulario e Linhas de Links
 */
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

async function CreateContexts(prosps: any) {
  prosps.edges.map((linha: any) => {
    if (linha.target === "1") {
      prosps.edges.map((linha2: any) => {
        if (linha2.target === linha.source) {
          prosps.edges.map((linha3: any) => {
            if (linha2.source === linha3.target) {
              prosps.edges.map((Departamento: any) => {
                if (Departamento.target === linha3.source) {
                  prosps.form.map((textResposta: any) => {
                    if (textResposta.id === linha3.target) {
                      prosps.form.map((textDepartmento: any) => {
                        if (textDepartmento.id === Departamento.target) {
                          monichat.InsertContexto(
                            textResposta,
                            textResposta.text,
                            `@sys.array_must(sair,exit) @sys.opt`,
                            "@topic random"
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

/**
 * Cria um Intenção sem contexto qual Termina na mesma intenção
 * @param props Array com Textos do Formulario e Linhas de Links
 */
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
                                `${formResposta.text} @topic random`,
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

/**
 *
 * @param {string} id  ID do Link o qual acontece a verificação Exemplo: "2"
 * @param props Array com Textos do Formulario e Linhas de Links
 * @returns {boolean} Retorna False se o Link não precissa de Contexto e True casso precisse
 */
async function ItentificaSePrecissaDeContexto(id: string, props: any) {
  let Confirm: boolean = true;

  await props.edges.map((linhas: any) => {
    if (id === linhas.target) {
      console.log("linhas.target");

      props.edges.map((linhas2: any) => {
        if (linhas.source === linhas2.target) {
          console.log("linhas2.target");
          props.form.map((formText: any) => {
            props.edges.map((linhas3: any) => {
              if (linhas2.source === linhas3.target) {
                console.log("linhas3.source");
                Confirm = true;
              }
            });
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

/**
 *
 * @param {string} Dartamento - Nome do Departamento para achar o id
 * @returns {number} ID - Retorna o id do Departamento
 */
async function FindIdDepartamento(Dartamento: string) {
  let DepartamentoID = 0;

  const data = await monichat.ListDepartamento();

  data.map((FindDepartamento: any) => {
    if (FindDepartamento.nome === Dartamento) {
      DepartamentoID = FindDepartamento.id;
    }
  });

  return DepartamentoID;
}

function objetoExisteNoArray(intencoesArray: any, de: string, para: string) {
  for (let i = 0; i < intencoesArray.length; i++) {
    if (intencoesArray[i].de === de && intencoesArray[i].para === para) {
      return true;
    }
  }
  return false;
}

async function FormatePropsData(props: any) {
  let FormData: any = {
    Intencoes: [],
    Contexto: [],
  };

  await props.edges.map((linha: any) => {
    if (linha.target === "1") {
      props.edges.map((linhas2: any) => {
        if (linha.source === linhas2.target) {
          props.form.map((textForm: any) => {
            if (textForm.id === linhas2.target) {
              FormData.Intencoes.push({
                de: linha.target,
                para: linhas2.target,
                text: textForm.text,
              });
            }
          });
        }
      });
    }
  });

  await props.edges.map((linha: any) => {
    if (linha.target != "1") {
      props.edges.map((linha2: any) => {

        let departamento = "";

        if (linha.source === linha2.target) {
          console.log(linha.source);
          props.form.map((textForm:any) =>{

          } )
        }

        if(linha.source != linha2.target){
          
        }

      });
    }
  });

  return FormData;
}

/**
 * Starta o Envio dos dados para API
 * @param props
 * @returns {void}
 */
async function StartIntencao(props: any) {
  //const response = await ItentificaSePrecissaDeContexto("2", props);
  console.log(props);
  let data = await FormatePropsData(props);
  console.log(data);

  return;
}

export async function ValidThoSend(props: any) {
  console.log(props);
  StartIntencao(props);
  //await VerifyIntencao(props);
  //await CreateContexts(props);

  //const res = await EncaminharDepartamento("3", props);

  return;
}
