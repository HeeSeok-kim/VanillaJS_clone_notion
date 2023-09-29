import Component from "../../template/component.js";

export default class Header extends Component {
  view() {
    const { title } = this.props;
    const $Header = document.createElement("header");
    $Header.className = "document_header";
    $Header.textContent = title ? title : "제목없음";

    return $Header;
  }
}
