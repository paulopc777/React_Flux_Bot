"use client"

import ConteinerDragg from 'app/Components/Conteiners/BoxDragg/ConteinerDragg'
import TextIcon from 'app/Components/Nodes/TextUtility/TextIcon'
import { DroppSelectsMenu } from 'app/Components/Utilitys/MenuDropDepartamento'
import { MonichatApi } from 'app/Hooks/AuthMoniChat'
import React, { useEffect, useState } from 'react'
import { MenuDepartaement } from './MenuDepartament'

export default function InsertDepartamento() {

    const [Nome, setNome] = useState('');
    const [Descricao, setDescricao] = useState('');
    const [Update, setUpdate] = useState(false);

    function setMenuOpt() { }
    function setMenu() { }

    function AddNewDepartament() {
        if (Nome.length > 0 && Descricao.length > 0) {
            const monichat = new MonichatApi().InsertDepartamento(Nome, Descricao);
            new MonichatApi().ListDepartamento();

            setNome('');
            setDescricao('');

        }
    }


    return (
        <ConteinerDragg w={"w-72"}>
            <TextIcon
                icon={"/svg/Departament.svg"}
                text={"Inserir Departamento"}
            />

            <MenuDepartaement funcModi={setMenuOpt} close={() => { Update }} />

            <input
                placeholder="Nome Departamento"
                className="shadow-inner p-1 my-4 overflow-hidden dark:bg-neutral-800 w-full box-border resize-none h-auto "
                required
                value={Nome}
                onChange={(e) => { setNome(e.target.value) }}
            />
            <input
                placeholder="Descrição"
                className="shadow-inner p-1  overflow-hidden dark:bg-neutral-800 w-full box-border resize-none h-auto "
                required
                value={Descricao}
                onChange={(e) => { setDescricao(e.target.value) }}
            />

            <button className='dark:bg-zinc-500 bg-slate-300 rounded-full px-3 py-1 mt-2 hover:bg-zinc-700 transition-all' onClick={AddNewDepartament}>Inserir</button>

        </ConteinerDragg>
    )
}
