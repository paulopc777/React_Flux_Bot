import useStore from "../../../Redux/store";

interface PropsClose {
  id: string;
}

const selector = (state: any) => ({
  removeNode: state.removeNode,
  deleteValue: state.deleteValue,
});

export default function Close({ id }: PropsClose) {
  const { removeNode, deleteValue } = useStore(selector);

  function handleRemoveNode() {
    console.log("delete")
    removeNode(id);
    deleteValue(id);
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
