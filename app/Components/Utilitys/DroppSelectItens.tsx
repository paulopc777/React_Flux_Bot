import { ListDepartamentos } from "app/Hooks/AuthMoniChat";
import { MenuRequireProps } from "./DroppSelects";
import { cache, useEffect, useState } from "react";
import { revalidateTag } from 'next/cache'

interface NomeProsp {
    nome: string
}


const LithoMenu = (nome: any) => {
    return (
        <li
            className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"

        >
            <div className="flex items-center">
                <span className="ml-3 block truncate font-normal">{nome}</span>
            </div>
        </li>
    );
};

function getStoredCartItems() {

    const storedCartItems = localStorage.getItem("Departamento");

    if (storedCartItems !== null) {
        try {
            const cartItems = JSON.parse(storedCartItems);
            return cartItems;
        } catch (error) {
            console.error(error);
        }
    }

    return [];
}
export const getItem = cache(async () => {
    const item = await db;
    return item
  })

export function DroppSelectsMenu() {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
   
    useEffect(() => {
      fetch('/api/profile-data')
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }, [])
   
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
   
    return (
        <ul
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
        >
            {data.map((opt: any, index: any) => (
                <LithoMenu
                    key={index}
                    nome={opt.nome}
                />
            ))}
        </ul>
    );
}