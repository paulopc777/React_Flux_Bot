"use client";

import { MonichatApi } from "app/Hooks/AuthMoniChat";
import { AnyTxtRecord } from "dns";
import { useState } from "react";

interface MenuRequireProps {
    nome?: string;
    funcModi: (nome: string) => void;
    close: () => void;
}

const LithoMenu = ({ nome, funcModi, close }: MenuRequireProps, { id }: any) => {

    return (
        <li
            className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 flex justify-between items-center hover:bg-zinc-200"
            onClick={() => {
                funcModi(nome ? nome : "");
                close();
            }}
        >
            <div className="flex items-center">
                <span className="ml-3 block truncate font-normal">{nome}</span>
            </div>
            <div className="w-4 ">
                <button className="w-full hover:bg-red-400 rounded-full" onClick={close}>
                    <img src="/svg/Close.svg" alt="Close" />
                </button>
            </div>
        </li>
    );
};

export function MenuUsuario({ funcModi, close }: MenuRequireProps) {

    const [Update, setUpdate] = useState(false);
    const storedMonichat = localStorage.getItem("Usuarios");

    let Monichat;

    if (storedMonichat) {
        Monichat = JSON.parse(storedMonichat);
    } else {
        new MonichatApi().ListDepartamento();
    }


    function Delete(id: string) {

        if (id) {

            const monichat = new MonichatApi().DeleteDepartament(id);
            setUpdate(!Update)

        }

    }


    return (
        <ul
            className=" z-10  max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm mt-auto"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
        >
            {Monichat.map((opt: any, index: any) => (
                <LithoMenu
                    key={index}
                    nome={opt.email}
                    funcModi={funcModi}
                    close={() => {}}
                />
            ))}
        </ul>
    );
}
