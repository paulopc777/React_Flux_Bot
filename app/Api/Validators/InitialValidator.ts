export function ValidInitialNode(props: any) {
  let push: any = [];
  props.edges.map((linhas: any) => {
    if (linhas.target === "1") {
      // console.log("Pass 1 ");
      props.nodes.map((node: any) => {
        // console.log("Pass 2");
        if (linhas.target === node.id) {
          // console.log("Pass 3");
          if (node.type === "PerguntaUnique") {
            // console.log("Pass 4");
            props.nodes.map((node2: any) => {
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