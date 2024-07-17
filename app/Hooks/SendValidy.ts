import useStore from "app/Redux/store";
import { useShallow } from "zustand/react/shallow";
import { MonichatApi } from "./AuthMoniChat";


export function ValidThoSend(props: any) {

    let Intencao: any = [];
    let RespostaIntencao: any = [];
    let Contexto: any = [];
    let ContextoResposta: any = [];

    console.log(props)

    if (props.edges) {
        props.edges.map((item: any) => {
            if (item.target === '1') {
                props.form.map((IntencaoItem: any) => {
                    if (IntencaoItem.id === item.source) {
                        Intencao.push(IntencaoItem)
                    }
                })
            }
        })
    }

    if (Intencao.length > 0) {
        Intencao.map((itemIntencao: any) => {
            props.edges.map((item: any) => {
                if (itemIntencao.id === item.target) {
                    props.form.map((itemForm: any) => {
                        if (item.source === itemForm.id) {
                            RespostaIntencao.push(itemForm)
                        }
                    })
                }
            })
        })
    }

    if (RespostaIntencao.length > 0) {
        RespostaIntencao.map((Resintencao: any) => {
            props.edges.map((linhas: any) => {
                if (Resintencao.id === linhas.target) {
                    props.form.map((Form: any) => {
                        if (linhas.source === Form.id) {
                            Contexto.push(Resintencao);
                            ContextoResposta.push(Form);
                        }
                    })
                }
            })
        })
    }

    const monitchat = new MonichatApi();



    for (let index = 0; index < Intencao.length; index++) {
        const element = Intencao[index];
        const element2 = RespostaIntencao[index];

        console.log(`${element.text} , ${element2.text}`)

        //monitchat.InsertIntencao(element.text, `@topic ${element2.id} @intent inicio`);
    }

    for (let index = 0; index < Contexto.length; index++) {
        const element = Contexto[index];
        const element2 = ContextoResposta[index];

        //monitchat.InsertContexto(Contexto.id, element2.text ,);
    }

    console.log(Intencao, RespostaIntencao);
    console.log(Contexto);
    console.log(ContextoResposta);

}
