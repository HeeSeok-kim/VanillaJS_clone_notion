import NavigationCard from "./NavigationCard.js";
import {
  defaultDocument,
  defaultForm,
} from "../../constants/documentTemplate.js";
import { getItem, setItem } from "../../utils/storage.js";
import { push } from "../../routes/index.js";
import Component from "../../template/component.js";

export default class Navigation extends Component {
  #actions = {
    delete: (id) => this.#deleteState(id),
    toggle: (id) => this.#onToggle(id),
    move: (id) => this.#onMove(id),
  };

  init() {
    this.state = defaultDocument;
    const result = getItem("document");
    if (result) {
      this.state = JSON.parse(result);
    }
  }

  #deleteState({ id }) {
    const stateId = parseInt(id);
    //첫번째 목록은 삭제가 되지 않기 위한 예외처리 코드
    if (stateId === 0) return;

    delete this.state.detailDocument[stateId];
    delete this.state.toggles[stateId];

    const documents = this.state.documents.filter(
      (document) => document.id !== stateId
    );
    this.state.documents = documents;
    this.setState(this.state);
    setItem("document", this.state);
  }

  view() {
    const $navigation = document.createElement("div");
    $navigation.className = "navigation";
    const { documents, toggles } = this.state;
    $navigation.innerHTML = `
      <div class="navigation_header">😄 Hee Notion</div>
        <div class="navigation_content">
          ${documents
            .map((document) =>
              NavigationCard({
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
    return $navigation;
  }
  mount() {
    this.querySelectorChild(`.navigation`).addEventListener("click", (e) => {
      const { target } = e;
      const id = target.parentNode.dataset.id;
      const action = target.dataset.action; // data-action 값을 가져옵니다.

      if (id === "newDocument") {
        const form = JSON.parse(defaultForm);
        form.id = this.state.length;

        this.state.detailDocument[form.id] = {
          ...form,
        };
        this.state.toggles[form.id] = false;

        this.state.documents = [
          ...this.state.documents,
          {
            id: form.id,
            title: form.title,
            document: form.document,
          },
        ];

        this.state.length += 1;

        this.setState(this.state);
        setItem("document", this.state);
      } else {
        if (action in this.#actions) {
          this.#actions[action]({ id });
        }
      }
    });
  }

  #onToggle({ id }) {
    this.state.toggles[id] = !this.state.toggles[id];
    this.setState(this.props);
  }

  #onMove({ id }) {
    this.navigate(`/documents/${id}`);
  }
}
