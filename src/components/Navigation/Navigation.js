import NavigationCard from "./NavigationCard.js";
import {
  defaultDocument,
  defaultForm,
} from "../../constants/documentTemplate.js";
import { getItem, setItem } from "../../utils/storage.js";
import Component from "../../template/component.js";
import deleteDocument, {
  getDocumentList,
  postDocument,
} from "../../../api/document.js";

export default class Navigation extends Component {
  #actions = {
    delete: async (id) => await this.#deleteState(id),
    toggle: (id) => this.#onToggle(id),
    move: (id) => this.#onMove(id),
  };

  init() {
    this.fetchDocumentList();
  }

  async #deleteState({ id }) {
    const documentId = parseInt(id);
    //첫번째 목록은 삭제가 되지 않기 위한 예외처리 코드
    if (documentId === 0) return;

    await deleteDocument(documentId);
    this.navigate(`/documents/0`);
  }

  view() {
    const $navigation = document.createElement("div");
    $navigation.className = "navigation";
    if (this.state) {
      const { documents, toggles } = this.state;
      $navigation.innerHTML = `
        <div class="navigation_header">😄 Hee Notion TEST</div>
        <div class="navigation_content">
          ${documents
            .map(
              (document) =>
                new NavigationCard({
                  id: document.id,
                  title: document.title,
                  toggle: toggles[document.id],
                })
            )
            .join("")}
        </div>
        <div class="navigation_footer" data-id="newDocument">
            <img src="/assets/add.svg">
            <span>페이지 추가<span>
        </div>
    `;
    }

    return $navigation;
  }
  mount() {
    this.querySelectorChild(`.navigation`).addEventListener(
      "click",
      async (e) => {
        const { target } = e;
        const id = target.parentNode.dataset.id;
        const action = target.dataset.action; // data-action 값을 가져옵니다.

        if (id === "newDocument") {
          const result = await postDocument();
          this.navigate(`/documents/${result.length - 1}`);
        } else {
          if (action in this.#actions) {
            this.#actions[action]({ id });
          }
        }
      }
    );
  }

  #onToggle({ id }) {
    this.state.toggles[id] = !this.state.toggles[id];
    this.setState(this.props);
  }

  #onMove({ id }) {
    this.navigate(`/documents/${id}`);
  }

  async fetchDocumentList() {
    const documentList = await getDocumentList();
    this.setState(documentList);
  }
}
