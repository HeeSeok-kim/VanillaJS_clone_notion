import Component from "../template/component.js";

export default class DefaultDocument extends Component {
  view() {
    const $container = document.createElement("div");
    $container.className = "default_document";
    $container.innerHTML = `
      <span>페이지를 선택해 주세요</span>
    `;

    return $container;
  }
}
