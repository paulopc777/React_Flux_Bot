"use client";

import React, { useState } from "react";
import { DroppSelectsMenu } from "./MenuDrop";
import useStore from "../../Redux/store";
import { useShallow } from "zustand/react/shallow";

export interface PropsDropMenu {
  nome: string;
}

interface OpsMenu {
  OptsMenu: PropsDropMenu[];
}

const selector = (state: any) => ({
  deleteValue: state.deleteValue,
  addValue: state.addValue,
  formValues: state.formValues,
});


export default function DroppSelects({ id }: any) {
  const [dropMenu, setDropMenu] = useState(false);
  const [menuOption, setMenuOption] = useState("Select");

  const { deleteValue, addValue, formValues } = useStore(useShallow(selector));


  function setMenu() {
    setDropMenu(!dropMenu);
  }

  function setMenuOpt(Select: string) {
    setMenuOption(Select);
    console.log("Save");
    deleteValue(id);
    addValue({ id: id, text: Select });
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
            <DroppSelectsMenu funcModi={setMenuOpt} close={setMenu} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
