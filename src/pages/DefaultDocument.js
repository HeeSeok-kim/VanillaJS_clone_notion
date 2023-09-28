export default function DefaultDocument() {
  const $container = document.createElement("div");
  $container.className = "DefaultDocument";

  this.render = () => {
    $container.innerHTML = `
      <span>페이지를 선택해 주세요</span>
    `;
    return $container;
  };
}
