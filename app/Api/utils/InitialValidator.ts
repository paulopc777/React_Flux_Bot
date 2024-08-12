export function ValidInitialNode(props: any) {
  let push: any = [];
  props.edges.forEach((linhas: any) => {
    if (linhas.target === "1") {
      // console.log("Pass 1 ");
      props.nodes.forEach((node: any) => {
        // console.log("Pass 2");
        if (linhas.target === node.id) {
          // console.log("Pass 3");
          if (node.type === "PerguntaUnique") {
            // console.log("Pass 4");
            props.nodes.forEach((node2: any) => {
              // console.log("Pass 5");
              if (node2.id === linhas.source) {
                // console.log("Pass 6");
                if (node2.type === "PerguntaUnique") {
                  // console.log("Pass 7");
                  push.push({
                    de: linhas.target,
                    para: linhas.source,
                    type: "PerguntaUnique",
                  });
                }
              }
            });
          }
        }
      });
    }
  });

  return push;
}
function areObjectsEqual(obj1: any, obj2: any) {
  // Verifica se ambos são objetos ou arrays
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return obj1 === obj2;
  }

  // Verifica se têm a mesma quantidade de chaves
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Verifica se todos os valores das chaves são iguais
  for (const key of keys1) {
    if (!keys2.includes(key) || !areObjectsEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

async function ComparaElemento(Oldprosp: any, newProps: any) {
  let update: any = [];

  const newn = newProps;
  const old = Oldprosp;

  await old.forEach(async (item: any, index: any) => {
    await newn.forEach(async (element: any) => {
      if (item.id === element.id) {
        const dd = await areObjectsEqual(item, element);
        if (dd) {
          console.log("objeto de id " + item.id + " São iguais");
        } else {
          update.push(element);
        }
      }
    });
  });

  return update;
}

const data = {
  form: [
    {
      id: "4",
      description: "{contact_name}{ticket_number}",
      Departamento: "Comercial",
    },
    {
      id: "7",
      description: "{contact_name}{ticket_number}",
      Departamento: "Financeiro",
    },
    {
      id: "12",
      description: "{contact_name}{ticket_number}",
      Departamento: "Monitchat",
    },
    {
      id: "11",
      description:
        "Ola {contact_name} estou te encaminhando para o departamento especifico ! \n\nO numero do seu tickt e {ticket_number} 😊",
      Departamento: "Monitcall",
    },
    {
      id: "2",
      Body: "Departamentos",
      desc: "<p><strong>Boa tader</strong> vindo ao Suporte da VipPhone !</p>",
      Footer: "ou digite sair",
      button: [
        {
          id: 1,
          text: "Comercial",
        },
        {
          id: 2,
          text: "Financeiro",
        },
        {
          id: 3,
          text: "Suporte",
        },
      ],
    },
    {
      id: "8",
      Body: "aplicação :",
      desc: "<p>Qual a aplicação ?</p>",
      Footer: "ou digite sair",
      button: [
        {
          id: 1,
          text: "Monitchat",
        },
        {
          id: 2,
          text: "Monitcall",
        },
      ],
    },
    {
      id: "3",
      text: "Comercial",
    },
    {
      id: "5",
      text: "Financeiro",
    },
    {
      id: "6",
      text: "Suporte",
    },
    {
      id: "9",
      text: "Monitchat",
    },
    {
      id: "10",
      text: "Monitcall",
    },
  ],
  edges: [
    {
      id: "reactflow__edge-2-1",
      type: "Padrao",
      source: "2",
      target: "1",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-3-2",
      type: "Padrao",
      source: "3",
      target: "2",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-5-2",
      type: "Padrao",
      source: "5",
      target: "2",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-6-2",
      type: "Padrao",
      source: "6",
      target: "2",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-4-3",
      type: "Padrao",
      source: "4",
      target: "3",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-7-5",
      type: "Padrao",
      source: "7",
      target: "5",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-8-6",
      type: "Padrao",
      source: "8",
      target: "6",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-9-8",
      type: "Padrao",
      source: "9",
      target: "8",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-10-8",
      type: "Padrao",
      source: "10",
      target: "8",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-12-9",
      type: "Padrao",
      source: "12",
      target: "9",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-11-10",
      type: "Padrao",
      source: "11",
      target: "10",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
  ],
  nodes: [
    {
      id: "1",
      data: {
        label: "Input Node",
        start: true,
        sourceHandles: [],
        targetHandles: [],
      },
      type: "PerguntaUnique",
      width: 197,
      height: 64,
      dragging: false,
      position: {
        x: 248.851301645003,
        y: 123.78805852974502,
      },
      selected: false,
      positionAbsolute: {
        x: 248.851301645003,
        y: 123.78805852974502,
      },
    },
    {
      id: "2",
      data: {
        label: "Node 2",
      },
      type: "Resposta",
      width: 308,
      height: 347,
      dragging: false,
      position: {
        x: 548.851301645003,
        y: 123.78805852974502,
      },
      selected: false,
    },
    {
      id: "3",
      data: {
        label: "Node 3",
      },
      type: "PerguntaUnique",
      width: 220,
      height: 142,
      dragging: false,
      position: {
        x: 951.2827321658948,
        y: 45.44834719967197,
      },
      selected: false,
      positionAbsolute: {
        x: 951.2827321658948,
        y: 45.44834719967197,
      },
    },
    {
      id: "4",
      data: {
        label: "Node 4",
      },
      type: "Departamento",
      width: 284,
      height: 130,
      dragging: false,
      position: {
        x: 1352.2723787866655,
        y: -23.28852760794203,
      },
      selected: false,
      positionAbsolute: {
        x: 1352.2723787866655,
        y: -23.28852760794203,
      },
    },
    {
      id: "5",
      data: {
        label: "Node 5",
      },
      type: "PerguntaUnique",
      width: 220,
      height: 142,
      dragging: false,
      position: {
        x: 939.6958792016272,
        y: 224.68574792395952,
      },
      selected: false,
      positionAbsolute: {
        x: 939.6958792016272,
        y: 224.68574792395952,
      },
    },
    {
      id: "6",
      data: {
        label: "Node 6",
      },
      type: "PerguntaUnique",
      width: 220,
      height: 142,
      dragging: false,
      position: {
        x: 940.1732467359952,
        y: 441.0162515613929,
      },
      selected: false,
      positionAbsolute: {
        x: 940.1732467359952,
        y: 441.0162515613929,
      },
    },
    {
      id: "7",
      data: {
        label: "Node 7",
      },
      type: "Departamento",
      width: 284,
      height: 130,
      dragging: false,
      position: {
        x: 1395.8519811788751,
        y: 158.46349338328892,
      },
      selected: false,
      positionAbsolute: {
        x: 1395.8519811788751,
        y: 158.46349338328892,
      },
    },
    {
      id: "8",
      data: {
        label: "Node 8",
      },
      type: "Resposta",
      width: 254,
      height: 295,
      dragging: false,
      position: {
        x: 1212.2849615381149,
        y: 370.54209100325954,
      },
      selected: false,
      positionAbsolute: {
        x: 1212.2849615381149,
        y: 370.54209100325954,
      },
    },
    {
      id: "9",
      data: {
        label: "Node 9",
      },
      type: "PerguntaUnique",
      width: 220,
      height: 142,
      dragging: false,
      position: {
        x: 1546.59216721821,
        y: 363.9445514493951,
      },
      selected: false,
      positionAbsolute: {
        x: 1546.59216721821,
        y: 363.9445514493951,
      },
    },
    {
      id: "10",
      data: {
        label: "Node 10",
      },
      type: "PerguntaUnique",
      width: 220,
      height: 142,
      dragging: false,
      position: {
        x: 1536.3792968908976,
        y: 538.9573785341754,
      },
      selected: false,
      positionAbsolute: {
        x: 1536.3792968908976,
        y: 538.9573785341754,
      },
    },
    {
      id: "11",
      data: {
        label: "Node 11",
      },
      type: "Departamento",
      width: 284,
      height: 304,
      dragging: false,
      position: {
        x: 1803.551746241634,
        y: 529.6101085934085,
      },
      selected: true,
      positionAbsolute: {
        x: 1803.551746241634,
        y: 529.6101085934085,
      },
    },
    {
      id: "12",
      data: {
        label: "Node 12",
      },
      type: "Departamento",
      width: 284,
      height: 256,
      dragging: false,
      position: {
        x: 1900.5714100896296,
        y: 281.08060158143593,
      },
      selected: false,
      positionAbsolute: {
        x: 1900.5714100896296,
        y: 281.08060158143593,
      },
    },
  ],
};

const data2 = {
  form: [
    {
      id: "4",
      description: "{contact_name}{ticket_number} aaa",
      Departamento: "Comercial",
    },
    {
      id: "7",
      description: "{contact_name}{ticket_number} asdasdasdasd",
      Departamento: "Financeiro",
    },
    {
      id: "12",
      description: "{contact_name}{ticket_number}",
      Departamento: "Monitchat",
    },
    {
      id: "11",
      description:
        "Ola {contact_name} estou te encaminhando para o departamento especifico ! \n\nO numero do seu tickt e {ticket_number} 😊",
      Departamento: "Monitcall",
    },
    {
      id: "2",
      Body: "Departamentos",
      desc: "<p><strong>Boa tader</strong> vindo ao Suporte da VipPhone !</p>",
      Footer: "ou digite sair",
      button: [
        {
          id: 1,
          text: "Comercial",
        },
        {
          id: 2,
          text: "Financeiro",
        },
        {
          id: 3,
          text: "Suporte",
        },
      ],
    },
    {
      id: "8",
      Body: "aplicação :",
      desc: "<p>Qual a aplicação ?</p>",
      Footer: "ou digite sair",
      button: [
        {
          id: 1,
          text: "Monitchat",
        },
        {
          id: 2,
          text: "Monitcall",
        },
      ],
    },
    {
      id: "3",
      text: "Comercial",
    },
    {
      id: "5",
      text: "Financeiro",
    },
    {
      id: "6",
      text: "Suporte",
    },
    {
      id: "9",
      text: "Monitchat",
    },
    {
      id: "10",
      text: "Monitcall",
    },
  ],
  edges: [
    {
      id: "reactflow__edge-2-1",
      type: "Padrao",
      source: "2",
      target: "1",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-3-2",
      type: "Padrao",
      source: "3",
      target: "2",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-5-2",
      type: "Padrao",
      source: "5",
      target: "2",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-6-2",
      type: "Padrao",
      source: "6",
      target: "2",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-4-3",
      type: "Padrao",
      source: "4",
      target: "3",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-7-5",
      type: "Padrao",
      source: "7",
      target: "5",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-8-6",
      type: "Padrao",
      source: "8",
      target: "6",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-9-8",
      type: "Padrao",
      source: "9",
      target: "8",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-10-8",
      type: "Padrao",
      source: "10",
      target: "8",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-12-9",
      type: "Padrao",
      source: "12",
      target: "9",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
    {
      id: "reactflow__edge-11-10",
      type: "Padrao",
      source: "11",
      target: "10",
      markerStart: {
        type: "arrowclosed",
        color: "#8d8d8d",
        width: 30,
        height: 30,
      },
      sourceHandle: null,
      targetHandle: null,
    },
  ],
  nodes: [
    {
      id: "1",
      data: {
        label: "Input Node",
        start: true,
        sourceHandles: [],
        targetHandles: [],
      },
      type: "PerguntaUnique",
      width: 197,
      height: 64,
      dragging: false,
      position: {
        x: 248.851301645003,
        y: 123.78805852974502,
      },
      selected: false,
      positionAbsolute: {
        x: 248.851301645003,
        y: 123.78805852974502,
      },
    },
    {
      id: "2",
      data: {
        label: "Node 2",
      },
      type: "Resposta",
      width: 308,
      height: 347,
      dragging: false,
      position: {
        x: 548.851301645003,
        y: 123.78805852974502,
      },
      selected: false,
    },
    {
      id: "3",
      data: {
        label: "Node 3",
      },
      type: "PerguntaUnique",
      width: 220,
      height: 142,
      dragging: false,
      position: {
        x: 951.2827321658948,
        y: 45.44834719967197,
      },
      selected: false,
      positionAbsolute: {
        x: 951.2827321658948,
        y: 45.44834719967197,
      },
    },
    {
      id: "4",
      data: {
        label: "Node 4",
      },
      type: "Departamento",
      width: 284,
      height: 130,
      dragging: false,
      position: {
        x: 1352.2723787866655,
        y: -23.28852760794203,
      },
      selected: false,
      positionAbsolute: {
        x: 1352.2723787866655,
        y: -23.28852760794203,
      },
    },
    {
      id: "5",
      data: {
        label: "Node 5",
      },
      type: "PerguntaUnique",
      width: 220,
      height: 142,
      dragging: false,
      position: {
        x: 939.6958792016272,
        y: 224.68574792395952,
      },
      selected: false,
      positionAbsolute: {
        x: 939.6958792016272,
        y: 224.68574792395952,
      },
    },
    {
      id: "6",
      data: {
        label: "Node 6",
      },
      type: "PerguntaUnique",
      width: 220,
      height: 142,
      dragging: false,
      position: {
        x: 940.1732467359952,
        y: 441.0162515613929,
      },
      selected: false,
      positionAbsolute: {
        x: 940.1732467359952,
        y: 441.0162515613929,
      },
    },
    {
      id: "7",
      data: {
        label: "Node 7",
      },
      type: "Departamento",
      width: 284,
      height: 130,
      dragging: false,
      position: {
        x: 1395.8519811788751,
        y: 158.46349338328892,
      },
      selected: false,
      positionAbsolute: {
        x: 1395.8519811788751,
        y: 158.46349338328892,
      },
    },
    {
      id: "8",
      data: {
        label: "Node 8",
      },
      type: "Resposta",
      width: 254,
      height: 295,
      dragging: false,
      position: {
        x: 1212.2849615381149,
        y: 370.54209100325954,
      },
      selected: false,
      positionAbsolute: {
        x: 1212.2849615381149,
        y: 370.54209100325954,
      },
    },
    {
      id: "9",
      data: {
        label: "Node 9",
      },
      type: "PerguntaUnique",
      width: 220,
      height: 142,
      dragging: false,
      position: {
        x: 1546.59216721821,
        y: 363.9445514493951,
      },
      selected: false,
      positionAbsolute: {
        x: 1546.59216721821,
        y: 363.9445514493951,
      },
    },
    {
      id: "10",
      data: {
        label: "Node 10",
      },
      type: "PerguntaUnique",
      width: 220,
      height: 142,
      dragging: false,
      position: {
        x: 1536.3792968908976,
        y: 538.9573785341754,
      },
      selected: false,
      positionAbsolute: {
        x: 1536.3792968908976,
        y: 538.9573785341754,
      },
    },
    {
      id: "11",
      data: {
        label: "Node 11",
      },
      type: "Departamento",
      width: 284,
      height: 304,
      dragging: false,
      position: {
        x: 1803.551746241634,
        y: 529.6101085934085,
      },
      selected: true,
      positionAbsolute: {
        x: 1803.551746241634,
        y: 529.6101085934085,
      },
    },
    {
      id: "12",
      data: {
        label: "Node 12",
      },
      type: "Departamento",
      width: 284,
      height: 256,
      dragging: false,
      position: {
        x: 1900.5714100896296,
        y: 281.08060158143593,
      },
      selected: false,
      positionAbsolute: {
        x: 1900.5714100896296,
        y: 281.08060158143593,
      },
    },
  ],
};

ComparaElemento(data.nodes, data2.nodes).then((res) => console.log(res));
