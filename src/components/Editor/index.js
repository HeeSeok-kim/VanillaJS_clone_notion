import Component from "../../template/component.js";
import { setItem } from "../../utils/storage.js";
import debounce from "../../utils/debounce.js";

export default class Editor extends Component {
  init() {
    this.state = JSON.parse(JSON.stringify(this.props.state));
  }

  view() {
    const $Editor = document.createElement("div");
    const detailDocument = this.props.state.detailDocument;
    // console.log(detailDocument);
    const { documentId } = this.props;
    const title = detailDocument[documentId].title;
    const content = detailDocument[documentId].content;
    // console.log(detailDocument[documentId]);

    $Editor.className = "editor_container";
    $Editor.innerHTML = `
      <input class="title" type="text" value="${
        title ? title : ""
      }" placeholder="${title ? "" : "제목 없음"}" >
      <textarea class="content" placeholder="${
        content ? "" : "본문을 입력해주세요"
      }">${content ? content : ""}</textarea>
    `;

    return $Editor;
  }
}
