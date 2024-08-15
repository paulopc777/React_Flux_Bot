import { MonichatApi } from "./AuthMoniChat";
import { getIdByNome, GetNodeType } from "./utils/Finders";
import {
  CreateContext,
  LinkContext2,
  LinkContexts,
} from "./service/ServiceContext";
import { ClearLegacy } from "./utils/clear/clearInitial";
import { ComparaElemento } from "./utils/InitialValidator";
import { FormatText } from "./utils/SendBackText";
import { COMPILER_INDEXES } from "next/dist/shared/lib/constants";

const token = localStorage.getItem("token");
// console.log(token);
const monichat = new MonichatApi();
if (token) {
  monichat.SetToken(token);
} else {
}

const NodeList = {
  PerguntaUnique: "PerguntaUnique",
  Resposta: "Resposta",
  Departamento: "Departamento",
  Timmer: "Timmer",
  Usuario: "Usuario",
};

interface Usuario {
  id: number;
  email: string;
}

async function CreateIntention(props: any) {
  props.edges.forEach((linhas: any) => {
    if (linhas.target === "1") {
      props.form.forEach((text: any) => {
        if (text.id == linhas.source) {
          const NodeType = GetNodeType(linhas.source, props);
          if (NodeType === NodeList.PerguntaUnique) {
            props.edges.forEach((linahs2: any) => {
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

  const com = localStorage.getItem("company_id");

  await props.form.forEach((form: any) => {
    if (form.Departamento) {
      props.edges.forEach((linhas: any) => {
        // linhas.source = id do departamento
        if (form.id === linhas.source) {
          props.edges.forEach((linhas2: any) => {
            // linhas2.source = if texto para ir para departamento
            if (linhas2.source === linhas.target) {
              props.edges.forEach((linhas3: any) => {
                if (linhas2.target === linhas3.source) {
                  // linhas3.source = box de botes de resposta
                  props.form.forEach((TextLInha2: any) => {
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
                            name: `${com}-${linhas3.source}`,
                            p1: `${TextLInha2.text}`,
                            p2: p2,
                            p3: idDepartamento,
                          });
                        } else {
                          allForms.push({
                            name: `${com}-${linhas3.source}`,
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
      props.edges.forEach((linhas: any) => {
        if (form.id === linhas.source) {
          props.edges.forEach((linhas2: any) => {
            if (linhas2.source === linhas.target) {
              props.edges.forEach((linhas3: any) => {
                if (linhas2.target === linhas3.source) {
                  props.form.forEach((TextLInha2: any) => {
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
                          name: `${com}-${linhas3.source}`,
                          p1: `${TextLInha2.text}`,
                          p2: `Estou te emcaminhando para o Colaborador. @topic random`,
                          p3: null,
                          p4: idUsuario,
                        });
                      } else {
                        allForms.push({
                          name: `${com}-${linhas3.source}`,
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

export async function UpdateValues(OldProps: any, props: any, Token: string) {
  const OldParse = JSON.parse(OldProps);
  console.log(props);
  const Update = await ComparaElemento(OldParse.form, props.form);
  console.log(Update);
  if (Update.length > 0) {
    await Update.forEach(async (NodeUpdate: any) => {
      //
      const NodeType = GetNodeType(NodeUpdate.id, props);
      console.log(NodeType);
      //
      await monichat.SetToken(Token);

      //
      if (NodeType === "Resposta") {
        const Text = FormatText(NodeUpdate.desc);
        const com = localStorage.getItem("company_id");
        try {
          monichat.UpdataContext(
            `${com}-${NodeUpdate.id}`,
            undefined,
            undefined,
            undefined,
            undefined,
            NodeUpdate.description
          );
          monichat.PutBotFlow(props, "1");
          return true;
        } catch (err) {
          console.log("Err");
          return false;
        }
      }
      if (NodeType === "Departamento") {
        console.log("Dentro de deparamtaneto");

        props.edges.forEach((ln1: any) => {
          if (ln1.source === NodeUpdate.id) {
            props.form.forEach((fm1: any) => {
              if (fm1.id === ln1.target) {
                props.edges.forEach((l2: any) => {
                  if (l2.source === ln1.target) {
                    console.log(l2.target);
                    console.log(fm1.text);
                    monichat.UpdateReply(
                      fm1.text,
                      l2.target,
                      NodeUpdate.description
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
  return false;
}

async function GetButtons(ln: any, props: any) {}

async function BtnActions(props: any) {
  const com = localStorage.getItem("company_id");

  let Dep: any = [];

  await props.nodes.forEach(async (nd1: any) => {
    let typeNd1 = GetNodeType(nd1.id, props);
    if (typeNd1 === "Resposta") {
      await props.form.forEach(async (fm1: any) => {
        if (fm1.id === nd1.id) {
          if (fm1.button) {
            await fm1.button.forEach(async (btn: any) => {
              await props.edges.forEach(async (ln1: any) => {
                if (
                  ln1.target === nd1.id &&
                  ln1.targetHandle === (btn.id - 1).toString()
                ) {
                  console.log(btn);
                  //
                  // Departamento
                  //
                  await props.form.forEach(async (fm1: any) => {
                    if (fm1.id === ln1.source) {
                      if (fm1.description) {
                        const idDepartamento: number = getIdByNome(
                          `${fm1.Departamento}`
                        );

                        Dep.push({
                          p1: `${com}-${nd1.id}`,
                          p2: `@sys.opt @sys.array_must(${btn.text}) @sys.opt`,
                          p3: fm1.description,
                          p4: idDepartamento,
                        });
                      } else if (fm1.Body) {
                        Dep.push({
                          p1: `${com}-${nd1.id}`,
                          p2: `@sys.opt @sys.array_must(${btn.text}) @sys.opt`,
                          p3: `@topic ${com}-${fm1.id} @intent inicio`,
                        });
                      } else if (fm1.text) {
                        Dep.push({
                          p1: `${com}-${nd1.id}`,
                          p2: `@sys.opt @sys.array_must(${btn.text}) @sys.opt`,
                          p3: `@topic ${com}-${fm1.id} @intent inicio`,
                        });
                      }
                    }
                  });
                }
              });
            });
          }
        }
      });
    }
  });

  return Dep;
}

export async function NewSend(props: any) {
  console.log(props);
  await ClearLegacy(monichat);

  try {
    await monichat.PutBotFlow(props, "1");
    //
    await CreateIntention(props);
    await CreateContext(props, monichat);
    //
    const data1: any = await LinkContext2(props, monichat);
    for (let index = 0; index < data1.length; index++) {
      const el: any = data1[index];
      await monichat.UpdataContext(el.de, el.com, el.para);
    }
    //
    const data2 = await BtnActions(props);
    console.log(data2);
    //
    for (let index = 0; index < data2.length; index++) {
      const el: any = data2[index];
      await monichat.UpdataContext(el.p1, el.p2, el.p3, el.p4);
    }
    //
    await CreateReply(props);
    //
  } catch (err) {
    console.log(err);
    return false;
  } finally {
    console.log("Send Finalizado !");
    return true;
  }
}

export async function PldNewSend(props: any) {
  console.log(props);

  await monichat.PutBotFlow(props, "1");

  try {
    const dd = await ClearLegacy(monichat);
    setTimeout(async () => {
      await CreateIntention(props);
      await CreateContext(props, monichat);

      setTimeout(async () => {
        await CreateReply(props);
        const data: any = await LinkContext2(props, monichat);
        for (let index = 0; index < data.length; index++) {
          const el: any = data[index];
          await monichat.UpdataContext(el.de, el.com, el.para);
        }
      }, 1000);

      setTimeout(async () => {
        const data = await BtnActions(props);
        console.log(data);

        for (let index = 0; index < data.length; index++) {
          const el: any = data[index];
          await monichat.UpdataContext(el.p1, el.p2, el.p3, el.p4);
        }
      }, 1000);
    }, 1000);
  } catch (err) {
    console.log(err);
    return false;
  } finally {
    console.log("Send Finalizado !");
    return true;
  }
}
