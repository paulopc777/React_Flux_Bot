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

async function CreateReply(props: any) {
  props.form.map((form: any) => {
    if (form.Departamento) {
      props.edges.map((linhas: any) => {
        if (form.id === linhas.source) {
          props.edges.map((linhas2: any) => {
            if (linhas2.source === linhas.target) {
              props.edges.map((linhas3: any) => {
                if (linhas2.target === linhas3.source) {
                  let allForms = [];

                  props.form.map((TextLInha2: any) => {
                    if (TextLInha2.id === linhas2.source) {
                      const idDepartamento: number = getIdByNome(
                        `${form.Departamento}`
                      );

                      console.log(
                        linhas3.source,
                        TextLInha2.text,
                        idDepartamento
                      );
                
                      setTimeout(async () => {
                        await monichat.UpdataContext(
                          `com${linhas3.source}`,
                          `@sys.opt @sys.array_must(${TextLInha2.text}) @sys.opt`,
                          `Estou te emcaminhando para departamemto @topic random`,
                          idDepartamento
                        );
                      }, 2000);
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
                      /*
                      console.log(
                        `Um contexto de com${linha.source} texto ${form.text} `
                      );*/

                      setInterval(() => {
                        return resolve;
                      }, 3000);

                      monichat.InsertContexto(
                        `com${linha.source}`,
                        form.text,
                        `@sys.input `,
                        `> Digite um valor valido @topic com${linha.source} @intent inicio`
                      );
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
            console.log("Buttion check", form);

            let BtnArray: any = [];

            form.button.map((item: any) => {
              if (item.text) {
                BtnArray.push(item.text);
              }
            });

            console.log(BtnArray);

            monichat.InsertContextoButton(
              `com${linhas.source}`,
              "@sys.input ",
              `@topic com${linhas.source} @intent inicio`,
              "Escolha uma opção abaixo: ",
              BtnArray,
              form.Body,
              form.Body,
              form.Footer
            );
          }
        }
      });
    }
  });
}

export async function ValidThoSend(props: any) {
  console.log(props);

  await CreateIntention(props);

  await CreateContextoText(props);
  await CreateContextButton(props);

  setTimeout(async () => {
     await CreateReply(props);
  }, 4000);

  return;
}

/*
monichat.UpdataContext(
  "com1",
  "@sys.opt @sys.array_must(ccc) @sys.opt",
  "ccc ! @topic random"
);*/

// monichat.ListContext();
