"use client";

import React, { useState } from "react";

export interface PropsDropMenu {
  nome: string;
}



interface OpsMenu {
  OptsMenu: PropsDropMenu[];
}

interface MenuRequireProps extends Partial<OpsMenu> {
  nome?: string;
  funcModi: (nome: string) => void;
  close: () => void;
}

const LithoMenu = ({ nome, funcModi, close }: MenuRequireProps) => {
  return (
    <li
      className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
      onClick={() => {
        funcModi(nome ? nome : '');
        close();
      }}
    >
      <div className="flex items-center">
        <span className="ml-3 block truncate font-normal">{nome}</span>
      </div>
    </li>
  );
};

function DroppSelectsMenu({ funcModi, close, OptsMenu }: MenuRequireProps) {
  if (OptsMenu == undefined) {
    OptsMenu = [];
  }

  return (
    <ul
      className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      tabIndex={-1}
      role="listbox"
      aria-labelledby="listbox-label"
      aria-activedescendant="listbox-option-3"
    >
      {OptsMenu.map((opt, index) => (
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

export default function DroppSelects({ OptsMenu }: OpsMenu) {
  const [dropMenu, setDropMenu] = useState(false);
  const [menuOption, setMenuOption] = useState("Select");

  function setMenu() {
    setDropMenu(!dropMenu);
  }

  function setMenuOpt(Select: string) {
    setMenuOption(Select);
  }

  return (
    <>
      <div>
        <div className="relative mt-2">
          <button
            onClick={setMenu}
            type="button"
            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
          >
            <span className="flex items-center">
              <span className="ml-3 block truncate">{menuOption}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button>

          {dropMenu ? (
            <DroppSelectsMenu
              funcModi={setMenuOpt}
              close={setMenu}
              OptsMenu={OptsMenu}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
