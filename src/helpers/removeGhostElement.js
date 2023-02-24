export default function removeGhostElement() {
  const ghostElement = document.getElementsByClassName('dragging')[0];
  ghostElement?.remove();
}
