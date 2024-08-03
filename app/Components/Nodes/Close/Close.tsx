import { Tooltip } from "@mui/joy";
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
    console.log("delete");
    removeNode(id);
    deleteValue(id);
  }

  return (
    <Tooltip
      title="Delete"
      variant="soft"
      color="danger"
      size="sm"
      placement="top-start"
    >
      <button
        className="text absolute right-2 top-2 w-2 h-2 bg-red-600 rounded-full "
        onClick={handleRemoveNode}
      ></button>
    </Tooltip>
  );
}
