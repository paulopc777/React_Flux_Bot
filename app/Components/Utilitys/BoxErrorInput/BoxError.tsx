interface PropsThoError {
  text: string;
  visible: boolean;
}

export default function BoxError({ text, visible }: PropsThoError) {
  return (
    <>
      {visible ? (
        <div className=" bg-red-300 absolute bottom-0  rounded-full py-1">{text}</div>
      ) : (
        ""
      )}
    </>
  );
}
