import { resolve } from "path";
import { MonichatApi } from "./AuthMoniChat";

const monichat = new MonichatApi();

async function CreateIntention(props: any) {
  props.edges.map((linhas: any) => {
    if (linhas.target === "1") {
      // console.log("text.id");
      props.form.map((text: any) => {
        if (text.id == linhas.source) {
          //console.log("text.id");
          props.edges.map((linahs2: any) => {
            if (linahs2.target === linhas.source) {
              //console.log("linahs2");
              monichat.InsertIntencao(
                text.text,
                `@topic com${linahs2.source} @intent inicio`
              );
            }
          });
        }
      });
    }
  });
}
interface Usuario {
  id: number;
  email: string;
}

function getIdByNome(nome: any) {
  // Ler a lista do localStorage
  let data = localStorage.getItem("monichat");
  if (data) {
    const departments = JSON.parse(data);

    if (departments) {
      // Encontrar o objeto com o nome fornecido
      const department = departments.find((dept: any) => dept.nome === nome);

      // Retornar o id se encontrado, caso contrário, retornar null ou outra indicação de não encontrado
      return department ? department.id : null;
    }
  }
  // Retornar null se não houver lista no localStorage
  return null;
}
function obterUsuariosDoLocalStorage(): Usuario[] {
  const usuariosString = localStorage.getItem("Usuarios");
  if (usuariosString) {
    try {
      const usuarios: Usuario[] = JSON.parse(usuariosString);
      return usuarios;
    } catch (error) {
      console.error("Erro ao fazer parse dos dados do localStorage:", error);
      return [];
    }
  } else {
    console.warn(
      'Nenhum dado encontrado no localStorage com a chave "Usuarios".'
    );
    return [];
  }
}

function encontrarIdPeloNome(usuarios: Usuario[], nome: string): number | null {
  const usuarioEncontrado = usuarios.find((usuario) => usuario.email === nome);
  return usuarioEncontrado ? usuarioEncontrado.id : null;
}

async function CreateReply(props: any) {
  let allForms: any = [];

  await props.form.map((form: any) => {
    if (form.Departamento) {
      props.edges.map((linhas: any) => {
        if (form.id === linhas.source) {
          props.edges.map((linhas2: any) => {
            if (linhas2.source === linhas.target) {
              props.edges.map((linhas3: any) => {
                if (linhas2.target === linhas3.source) {
                  props.form.map((TextLInha2: any) => {
                    if (TextLInha2.id === linhas2.source) {
                      const idDepartamento: number = getIdByNome(
                        `${form.Departamento}`
                      );

                      // console.log(
                      //   linhas3.source,
                      //   TextLInha2.text,
                      //   idDepartamento
                      // );
                      allForms.push({
                        name: `com${linhas3.source}`,
                        p1: `@sys.opt @sys.array_must(${TextLInha2.text}) @sys.opt`,
                        p2: `Estou te emcaminhando para departamemto @topic random`,
                        p3: idDepartamento,
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    } else if (form.Usuario) {
      props.edges.map((linhas: any) => {
        if (form.id === linhas.source) {
          props.edges.map((linhas2: any) => {
            if (linhas2.source === linhas.target) {
              props.edges.map((linhas3: any) => {
                if (linhas2.target === linhas3.source) {
                  props.form.map((TextLInha2: any) => {
                    if (TextLInha2.id === linhas2.source) {
                      const data = obterUsuariosDoLocalStorage();

                      const idUsuario: any = encontrarIdPeloNome(
                        data,
                        `${form.Usuario}`
                      );

                      console.log(`reply ${idUsuario}, de contexto ${linhas3.source}`)

                      allForms.push({
                        name: `com${linhas3.source}`,
                        p1: `@sys.opt @sys.array_must(${TextLInha2.text}) @sys.opt`,
                        p2: `Estou te emcaminhando para o Colaborador. @topic random`,
                        p3: null,
                        p4: idUsuario,
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

  for (let index = 0; index < allForms.length; index++) {
    const data = allForms[index];
    // console.log(data);
    await monichat.UpdataContext(data.name, data.p1, data.p2, data.p3, data.p4);
  }
}

async function AddDefoltContex() {}

async function CreateContextoText(props: any) {
  props.edges.map((linha: any) => {
    if (linha.target != "1") {
      props.form.map((form: any) => {
        if (form.id === linha.source) {
          if (form.text) {
            props.edges.map((linha2: any) => {
              if (linha.source === linha2.target) {
                props.form.map((Dep: any) => {
                  if (linha2.source === Dep.id) {
                    if (Dep.text) {
                      props.nodes.map((nodesType: any) => {
                        if (nodesType.id === linha.source) {
                          if (nodesType.type != "PerguntaUnique") {
                            // console.log(
                            //   `Um contexto de com${linha.source} texto ${form.text} `
                            // );

                            setInterval(() => {
                              return resolve;
                            }, 3000);

                            monichat.InsertContexto(
                              `com${linha.source}`,
                              form.text,
                              `@sys.input `,
                              `> Digite um valor valido @topic com${linha.source} @intent inicio`
                            );
                          }
                        }
                      });
                    } else {
                      /*
                      console.log(
                        `Um contexto de com${linha.target} reply ${linha2.target} text ${form.text} Departamento ${Dep.Departamento} `
                      );*/
                      /*
                      monichat.UpdataContext(
                        `com${linha.target}`,
                        `@sys.opt @sys.array_must(${form.text}) @sys.opt `,
                        "CreateReply @topic random",
                         getIdByNome(`${Dep.Departamento}`)
                      );*/
                    }
                  }
                });
              }
            });
          }
        }
      });
    }
  });
}

async function CreateContextButton(prosp: any) {
  prosp.edges.map((linhas: any) => {
    if (linhas.target != "1") {
      prosp.form.map((form: any) => {
        if (form.button) {
          if (form.id === linhas.source) {
            // console.log("Buttion check", form);

            let BtnArray: any = [];

            form.button.map((item: any) => {
              if (item.text) {
                BtnArray.push(item.text);
              }
            });

            // console.log(BtnArray);

            monichat.InsertContextoButton(
              `com${linhas.source}`,
              "@sys.input ",
              `@topic com${linhas.source} @intent inicio`,
              `${form.desc}`,
              BtnArray,
              "",
              form.Body,
              form.Footer
            );
          }
        }
      });
    }
  });
}

async function CreateContexContext(props: any) {
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
                          if (nodeType3.type != "Departamento" && nodeType3.type != "Usuario") {
                            props.form.map((textForm: any) => {
                              if (textForm.id === linhas.source) {
                                // console.log(
                                //   `linhas id ${linhas.target} para ${linhas.source} são ${nodeType.type} espera a ${linhas2.source}`
                                // );

                                setInterval(() => {
                                  return resolve;
                                }, 3000);

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

export async function ValidThoSend(props: any) {
  console.log(props);

  await CreateIntention(props);
  // console.log("complete 1 ");
  await CreateContextoText(props);
  // console.log("complete 2");
  await CreateContextButton(props);
  // console.log("complete 3");

  setTimeout(async () => {
    await CreateContexContext(props);
    // console.log("complete 4");
  }, 6000);

  setTimeout(async () => {
    await CreateReply(props);
  }, 4000);

  return true;
}

/*
monichat.UpdataContext(
  "com1",
  "@sys.opt @sys.array_must(ccc) @sys.opt",
  "ccc ! @topic random"
);*/

// monichat.ListContext();
