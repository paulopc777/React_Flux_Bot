/**
 *
 * @param id id do Node que deseja buscar
 * @param props props atuais
 * @returns node type or false
 */
export function GetNodeType(id: string, props: any) {
  let res;

  props.nodes.forEach((N: any) => {
    if (N.id === id) {
      res = N.type;
    }
  });

  return res || null;
}

export function getIdByNome(nome: any) {
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
