import { getItem, setItem } from "../utils/storage.js";
import Header from "../components/Header/index.js";
import Editor from "../components/Editor/index.js";
import Component from "../template/component.js";
import debounce from "../utils/debounce.js";

export default class DocumentPage extends Component {
  init() {
    const result = getItem("document");
    if (result) {
      this.state = JSON.parse(result);
    }
  }

  view() {
    const { detailDocument } = this.state;
    const documentId = this.props.documentId;
    const $documentContainer = document.createElement("div");

    $documentContainer.className = "document_container";

    this.header = new Header({
      $target: $documentContainer,
      props: detailDocument[documentId],
    });
    new Editor({
      $target: $documentContainer,
      props: {
        state: this.state,
        documentId: documentId,
      },
    });
    // ${Editor(this.state)}
    return $documentContainer;
  }

  mount() {
    const documentId = this.props.documentId;
    this.$target.addEventListener(
      "keyup",
      debounce((e) => {
        const className = e.target.className;
        const detailDocument = this.state.detailDocument[documentId];
        const document = this.state.documents.find((document) => {
          return document.id === parseInt(documentId);
        });
        const value = e.target.value;

        if (className == "title") {
          detailDocument.title = value;
          document.title = value;
        } else {
          detailDocument.content = value;
          document.content = value;
        }

        setItem("document", this.state);

        this.header.render();
        this.props.navigation.setState(this.state);
      }, 500)
    );
  }
}
