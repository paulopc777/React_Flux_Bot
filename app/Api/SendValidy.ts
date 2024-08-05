import { resolve } from "path";
import { MonichatApi } from "./AuthMoniChat";
import { FormatText } from "./Validators/SendBackText";
import { getIdByNome, GetNodeType } from "./Finders";
import { CreateContext, LinkContexts } from "./Logic/Context";

const monichat = new MonichatApi();
const NodeList = {
  PerguntaUnique: "PerguntaUnique",
  Resposta: "Resposta",
  Departamento: "Departamento",
  Timmer: "Timmer",
  Usuario: "Usuario",
};

const teste = {
  nodes: [
    {
      id: "1",
      type: "PerguntaUnique",
      data: {
        label: "Input Node",
        start: true,
        sourceHandles: [],
        targetHandles: [],
      },
      position: {
        x: 248.851301645003,
        y: 123.78805852974502,
      },
      width: 202,
      height: 64,
      selected: false,
      positionAbsolute: {
        x: 248.851301645003,
        y: 123.78805852974502,
      },
      dragging: false,
    },
    {
      id: "2",
      type: "PerguntaUnique",
      data: {
        label: "Node 2",
      },
      position: {
        x: 548.851301645003,
        y: 123.78805852974502,
      },
      width: 220,
      height: 142,
    },
  ],
  edges: [
    {
      type: "Padrao",
      markerStart: {
        type: "arrowclosed",
        width: 30,
        height: 30,
        color: "#8d8d8d",
      },
      source: "2",
      sourceHandle: null,
      target: "1",
      targetHandle: null,
      id: "reactflow__edge-2-1",
    },
  ],
  form: [
    {
      id: "2",
      text: "",
    },
  ],
};

interface Usuario {
  id: number;
  email: string;
}

async function CreateIntention(props: any) {
  props.edges.map((linhas: any) => {
    if (linhas.target === "1") {
      props.form.map((text: any) => {
        if (text.id == linhas.source) {
          const NodeType = GetNodeType(linhas.source, props);
          if (NodeType === NodeList.PerguntaUnique) {
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

          if (NodeType === NodeList.Resposta) {
            monichat.InsertIntencao(
              "@sys.input",
              `@topic com${linhas.source} @intent inicio`
            );
          }
        }
      });
    }
  });
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
        // linhas.source = id do departamento
        if (form.id === linhas.source) {
          props.edges.map((linhas2: any) => {
            // linhas2.source = if texto para ir para departamento
            if (linhas2.source === linhas.target) {
              props.edges.map((linhas3: any) => {
                if (linhas2.target === linhas3.source) {
                  // linhas3.source = box de botes de resposta
                  props.form.map((TextLInha2: any) => {
                    if (TextLInha2.id === linhas2.source) {
                      if (TextLInha2.text) {
                        const idDepartamento: number = getIdByNome(
                          `${form.Departamento}`
                        );

                        let p2 =
                          "Estou te emcaminhando para departamemto @topic random";

                        if (form.description) {
                          p2 = `${form.description} @topic random`;
                        }
                        if (TextLInha2.text === "@sys.input") {
                          allForms.push({
                            name: `com${linhas3.source}`,
                            p1: `${TextLInha2.text}`,
                            p2: p2,
                            p3: idDepartamento,
                          });
                        } else {
                          allForms.push({
                            name: `com${linhas3.source}`,
                            p1: `@sys.opt @sys.array_must(${TextLInha2.text}) @sys.opt`,
                            p2: p2,
                            p3: idDepartamento,
                          });
                        }
                      }
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

                      console.log(
                        `reply ${idUsuario}, de contexto ${linhas3.source}`
                      );

                      // console.log(TextLInha2.text);

                      if (TextLInha2.text == "@sys.input") {
                        allForms.push({
                          name: `com${linhas3.source}`,
                          p1: `${TextLInha2.text}`,
                          p2: `Estou te emcaminhando para o Colaborador. @topic random`,
                          p3: null,
                          p4: idUsuario,
                        });
                      } else {
                        allForms.push({
                          name: `com${linhas3.source}`,
                          p1: `@sys.opt @sys.array_must(${TextLInha2.text}) @sys.opt`,
                          p2: `Estou te emcaminhando para o Colaborador. @topic random`,
                          p3: null,
                          p4: idUsuario,
                        });
                      }
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
    console.log(data);

    await monichat.UpdataContext(data.name, data.p1, data.p2, data.p3, data.p4);
  }
}

export async function ValidThoSend(props: any) {
  console.log(props);
  try {
    await CreateIntention(props);
    await CreateContext(props, monichat);

    setTimeout(async () => {
      await CreateReply(props);
      console.log("complete 4");
    }, 4000);

    setTimeout(async () => {
      await LinkContexts(props, monichat);
      console.log("complete 5");
    }, 6000);

    return true;
  } catch (err) {
    console.log(err);
  }
}
