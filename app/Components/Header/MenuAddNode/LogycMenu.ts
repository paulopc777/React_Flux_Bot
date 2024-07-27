export const UseMousePosition = (event: any) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  return { x: mouseX, y: mouseY };
};
