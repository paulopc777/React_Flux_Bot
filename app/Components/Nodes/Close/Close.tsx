import useStore from "../../../Redux/store";

interface PropsClose {
  id: string;
}

export default function Close({ id }: PropsClose) {
  const removeNode = useStore((state) => state.removeNode);

  function handleRemoveNode() {
    removeNode(id);
  }

  return (
    <button
      className="text absolute -right-2 -top-2 w-5 h-5"
      onClick={handleRemoveNode}
    >
      <img src="/svg/Close.svg" alt="Close" />
    </button>
  );
}
