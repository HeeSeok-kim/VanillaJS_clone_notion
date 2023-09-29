import { getItem } from "../utils/storage.js";
import Header from "../components/Header/index.js";
import Editor from "../components/Editor/index.js";
import Component from "../template/component.js";

export default class DocumentPage extends Component {
  init() {
    const result = getItem("document");
    if (result) {
      this.state = JSON.parse(result);
    }
  }

  view() {
    const { detailDocument } = this.state;
    const documentId = this.props;
    const $documentContainer = document.createElement("div");

    $documentContainer.className = "document_container";

    new Header({
      $target: $documentContainer,
      props: detailDocument[documentId],
    });
    new Editor({
      $target: $documentContainer,
      props: this.state,
    });
    // ${Editor(this.state)}
    return $documentContainer;
  }
}
