import { Position } from "@xyflow/react";
import MessageCompZap from "app/Components/ZapMessageTemplate/MessageComp";
import MessageCompButton from "app/Components/ZapMessageTemplate/MessageCompButton";
import useStore from "app/Redux/store";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Handle } from "reactflow";

const selector = (state: any) => ({
  formValues: state.formValues,
});

interface props {
  id: string;
}

const convertListToParagraph = (html: any) => {
  // Cria um elemento div temporário para manipulação do HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Seleciona o <ul> dentro do tempDiv
  const ul = tempDiv.querySelector("ul");

  // Verifica se o <ul> existe
  if (ul) {
    // Concatena o texto de todos os <li> em uma string
    const textContent = Array.from(ul.querySelectorAll("li"))
      .map((li: any) => li.textContent.trim())
      .join(" ");

    // Retorna o texto dentro de um <p>
    return `<p>${textContent}</p>`;
  }

  // Retorna o HTML original se não houver <ul>
  return html;
};

export default function RespostaPreview({ id }: props) {
  const { formValues } = useStore(selector);
  const [Value, setValue] = useState("");

  const Converted = useCallback(() => {
    formValues.forEach((item: any) => {
      if (item.id === id) {
        if (item.text) {
          const convertedValue = convertListToParagraph(item.text);
          setValue(convertedValue);
        }
        if (item.button) {
          setButton(item);
        }
      }
    });
  }, [formValues, id]);

  const [Button, setButton]: any = useState();

  useEffect(() => {
    Converted();
  }, [Converted]);

  const ChageComponents = () => {
    if (Value) {
      return <MessageCompZap formattedText={Value}></MessageCompZap>;
    }
    if (Button) {
      // console.log(Button)
      return (
        <>
          <div className="flex flex-col animation_Message pl-2 pr-4 pt-4 break-words">
            <div>
              <MessageCompButton
                Body={Button.Body}
                Foter={Button.Footer}
                formattedText={Button.desc}
              ></MessageCompButton>
            </div>

            {/* Buttons */}
            {Button.button.map((btn: any, index: number) => {
              return (
                <>
                  <div className="text-white mt-1 relative">
                    <div className="my-[2px] px-6 py-2 rounded-xl  bg-[#313C42] ">
                      <p className="text-[#36AFEB] text-center">{btn.text}</p>
                    </div>
                    <Handle
                      type="target"
                      position={Position.Right}
                      id={`id${index}`}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </>
      );
    }
  };

  return (
    <>
      <ChageComponents></ChageComponents>
    </>
  );
  // return <div dangerouslySetInnerHTML={{ __html: Value }} className="!list-disc p-3 w-full border-2 border-zinc-300 mt-2 rounded-md break-words"></div>;
}
