import Component from "../../template/component.js";

export default class Editor extends Component {
  view() {
    const $Editor = document.createElement("div");
    $Editor.className = "editor_container";
    $Editor.innerHTML = `
      <input>
      <textarea></textarea>
    `;

    return $Editor;
  }
}
