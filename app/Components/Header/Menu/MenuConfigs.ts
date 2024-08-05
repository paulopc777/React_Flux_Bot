export interface NodesTypesList {
  PerguntaUnique: "PerguntaBox";
  Resposta: "RespostaBox";
  Departamento: "DepartamentoBox";
  Timmer: "BoxTimmer";
  Usuario: "UsuarioBox";
}

export interface MenuItemProps {
  icon: string;
  Title: string;
  TypeBox: keyof NodesTypesList;
  Esplicacao?: string;
}

export const MenuItems: MenuItemProps[] = [
  {
    icon: "svg/messagerec.svg",
    Title: "Mensagem do Cliente",
    TypeBox: "PerguntaUnique",
    Esplicacao:
      "Mensagem esperada de Cliente, Mensagem o qual o bot deve esperar para executar uma ação ",
  },
  {
    icon: "svg/messageresponse.svg",
    Title: "Mensagem de Resposta",
    TypeBox: "Resposta",
    Esplicacao: "Mensagem de Resposta para Mensagem de Cliente",
  },
  {
    icon: "svg/Departament.svg",
    Title: "Transferir para Departamento",
    TypeBox: "Departamento",
    Esplicacao: "Ação de Transferir para um departamento",
  },
  {
    icon: "svg/user.svg",
    Title: "Transferir para Usuario",
    TypeBox: "Usuario",
    Esplicacao: "Ação de trasferir para Usuario",
  },
];
