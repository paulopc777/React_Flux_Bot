export function GetScreenCenter() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const nodeWidth = 100;
  const nodeHeight = 50;
  const position = {
    x: (windowWidth - nodeWidth) / 2,
    y: (windowHeight - nodeHeight) / 2,
  };

  return position;
}
