import MessageCompZap from "app/Components/ZapMessageTemplate/MessageComp";
import MessageCompButton from "app/Components/ZapMessageTemplate/MessageCompButton";
import useStore from "app/Redux/store";
import { strict } from "assert";
import React, { useEffect, useState } from "react";

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
  const [Button, setButton]: any = useState();

  useEffect(() => {
    formValues.map((item: any) => {
      // console.log(item);
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
  }, [formValues]);

  const ChageComponents = () => {
    if (Value) {
      return <MessageCompZap formattedText={Value}></MessageCompZap>;
    }
    if (Button) {
      console.log(Button)
      return (
        <MessageCompButton
          Body={Button.Body}
          Foter={Button.Footer}
          formattedText={Button.desc}
          buttons={Button.button}
        ></MessageCompButton>
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
