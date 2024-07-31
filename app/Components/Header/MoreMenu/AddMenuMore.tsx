import ButtonIcon from "app/Components/Buttons/ButtonIcon";

export default function AddMenuMore() {
  return (
    <div className="w-fit">
      <a href="/Config/">
        <ButtonIcon w={'w-10 h-10'} icons={'/svg/config.svg'}></ButtonIcon>
      </a>
    </div>
  )
}
