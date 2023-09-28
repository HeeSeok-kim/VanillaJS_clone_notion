import NavigationCard from "./NavigationCard.js";
import { defaultDocument, defaultForm } from "../../constants/index.js";
import { getItem, setItem } from "../../utils/storage.js";
import { push } from "../../routes/index.js";
import Component from "../../template/component.js";

export default class Navigation extends Component {
  #actions = {
    delete: (id) => this.#deleteState(id),
    toggle: (id) => this.#onToggle(id),
    move: (id) => this.#onMove(id),
  };

  #deleteState({ id }) {
    console.log(id);
    const stateId = parseInt(id);

    if (stateId === 0) return;
    delete this.props.detailDocument[stateId];
    delete this.props.toggles[stateId];

    const documents = this.props.documents.filter(
      (document) => document.id !== stateId
    );
    this.props.documents = documents;
    setItem("document", this.props);
    this.render();
  }
  view() {
    const { documents, toggles } = this.props;
    return `
      <div class="navigation">
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
      </div>
    `;
  }
  updateState(form) {
    const { documents, length, detailDocument, toggles } = this.props;
    form.id = length;

    detailDocument[form.id] = {
      ...form,
    };
    toggles[form.id] = false;
    documents.push({
      id: form.id,
      title: form.title,
      document: form.document,
    });

    this.props.length += 1;
    setItem("document", this.props);
  }

  mount() {
    this.querySelectorChild(`.navigation`).addEventListener("click", (e) => {
      const { target } = e;
      const id = target.parentNode.dataset.id;
      const action = target.dataset.action; // data-action 값을 가져옵니다.

      if (id === "newDocument") {
        const form = JSON.parse(defaultForm);
        this.updateState(form);
        this.render();
      } else {
        if (action in this.#actions) {
          this.#actions[action]({ id });
        }
      }
    });
  }

  #onToggle({ id }) {
    this.props.toggles[id] = !this.props.toggles[id];
    this.render();
  }

  #onMove({ id }) {
    push(`/documents/${id}`);
    this.navigate(`/dicuments/${id}`);
  }
}
