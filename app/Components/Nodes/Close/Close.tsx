import { Tooltip } from "@mui/joy";
import useStore from "../../../Redux/store";
import Image from "next/image";

interface PropsClose {
  id: string;
}

const selector = (state: any) => ({
  removeNode: state.removeNode,
  deleteValue: state.deleteValue,
});

export default function Close({ id }: PropsClose) {
  const { removeNode, deleteValue } = useStore(selector);

  function handleRemove() {
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
        className="text absolute right-2 top-2 rounded-full "
        onClick={handleRemove}
      >
        <Image
          src="/svg/trash.svg"
          className="filter_grey"
          width={13}
          height={13}
          alt="lixo"
        />
      </button>
    </Tooltip>
  );
}
