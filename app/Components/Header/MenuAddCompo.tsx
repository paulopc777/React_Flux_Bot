


import React from 'react'
import TextIcon from '../TextUtility/TextIcon'
import { useShallow } from 'zustand/react/shallow';
import useStore from '../../Redux/store';


const selector = (state: any) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    addNode: state.addNode, // Adicione isso ao estado
});

export default function MenuAddCompo() {

    const { nodes, addNode } = useStore(
        useShallow(selector),
    );

    const handleAddNode = (type: string) => {
        // Cria um novo nó com um id único
        const newNode = {
            id: `${nodes.length + 1}`,
            type: type,
            data: { label: `Node ${nodes.length + 1}` },
            position: { x: Math.random() * 400, y: Math.random() * 400 }, // Posição aleatória
        };
        addNode(newNode); // Função para adicionar o nó ao estado
    };

    return (
        <div className={'w-5/6 h-fit p-2 absolute z-20 shadow-lg bg-white rounded-md  dark:bg-zinc-900 top-20'} >

            <ul className='w-full flex flex-col gap-y-2 dark:text-white'>

                <li className=' rounded-md hover:bg-slate-50 p-4 shadow-sm cursor-pointer  dark:bg-zinc-800 dark:hover:bg-zinc-700' onClick={() => { handleAddNode('PerguntaUnique') }}>
                    <TextIcon text='Mensagem cliente' icon='svg/messagerec.svg'></TextIcon>
                </li>

                <li className=' rounded-md hover:bg-slate-50 p-4 shadow-sm cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700' onClick={() => { handleAddNode('Resposta') }}>
                    <TextIcon text='Resposta' icon='svg/messageresponse.svg'></TextIcon>
                </li>

                <li className=' rounded-md hover:bg-slate-50 p-4 shadow-sm cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700' onClick={() => { handleAddNode('Departamento') }} >
                    <TextIcon text='Transferir para Departamento' icon='svg/Departament.svg'></TextIcon>
                </li>

                <li className=' rounded-md hover:bg-slate-50 p-4 shadow-sm cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700' onClick={() => { handleAddNode('Timmer') }} >
                    <TextIcon text='Aguarda Tempo' icon='svg/Clock.svg'></TextIcon>
                </li>


            </ul>

        </div>


    )
}
