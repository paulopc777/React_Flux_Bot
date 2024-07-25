"use client";

import { MonichatApi } from "app/Hooks/AuthMoniChat";

interface MenuRequireProps {
  nome?: string;
  funcModi: (nome: string) => void;
  close: () => void;
}

const LithoMenu = ({ nome, funcModi, close }: MenuRequireProps) => {
  return (
    <li
      className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
      onClick={() => {
        funcModi(nome ? nome : "");
        close();
      }}
    >
      <div className="flex items-center">
        <span className="ml-3 block truncate font-normal">{nome}</span>
      </div>
    </li>
  );
};

export function DroppSelectsMenu({ funcModi, close }: MenuRequireProps) {

  const storedMonichat = localStorage.getItem("monichat");
  let Monichat;

  if (storedMonichat) {
    Monichat = JSON.parse(storedMonichat);
  } else {
    new MonichatApi().ListDepartamento();
  }

  return (
    <ul
      className=" z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      tabIndex={-1}
      role="listbox"
      aria-labelledby="listbox-label"
      aria-activedescendant="listbox-option-3"
    >
      {Monichat.map((opt: any, index: any) => (
        <LithoMenu
          key={index}
          nome={opt.nome}
          funcModi={funcModi}
          close={close}
        />
      ))}
    </ul>
  );
}
