export default function downloadJson(text: string) {
  const element = document.createElement("a");
  console.log(text);
  element.setAttribute("href", "data:application/json;charset=utf-8," + text);
  element.setAttribute("download", "Serega.json");

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
