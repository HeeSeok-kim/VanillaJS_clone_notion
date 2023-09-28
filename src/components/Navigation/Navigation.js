import NavigationCard from "./NavigationCard.js";
import { defaultDocument, defaultForm } from "../../constants/index.js";
import { getItem, setItem } from "../../utils/storage.js";
import { push } from "../../routes/index.js";

export default function Navigation({ $target, pageRender }) {
  this.state = defaultDocument;
  const result = getItem("document");
  if (result) {
    this.state = JSON.parse(result);
  }
  const $nav = document.createElement("div");
  $nav.className = "navigation";

  const updateState = (form) => {
    const { documents } = this.state;
    form.id = this.state.length;

    this.state.detailDocument[form.id] = {
      ...form,
    };
    this.state.toggles[form.id] = false;

    this.state.documents = [
      ...documents,
      {
        id: form.id,
        title: form.title,
        document: form.document,
      },
    ];

    this.state.length += 1;

    setItem("document", this.state);
  };

  const deleteState = ({ id }) => {
    const stateId = parseInt(id);
    if (stateId === 0) return;
    delete this.state.detailDocument[stateId];
    delete this.state.toggles[stateId];

    const documents = this.state.documents.filter(
      (document) => document.id !== stateId
    );
    this.state.documents = documents;
    setItem("document", this.state);
    render();
  };

  const onToggle = ({ id }) => {
    this.state.toggles[id] = !this.state.toggles[id];
    render();
  };

  const onMove = ({ id }) => {
    console.log("call~~~");
    push(`/documents/${id}`);
    pageRender();
  };

  this.actions = {
    delete: (id) => deleteState(id),
    toggle: (id) => onToggle(id),
    move: (id) => onMove(id),
  };

  $nav.addEventListener("click", (e) => {
    const { target } = e;
    const id = target.parentNode.dataset.id;
    const action = target.dataset.action; // data-action 값을 가져옵니다.

    if (id === "newDocument") {
      const form = JSON.parse(defaultForm);
      updateState(form);
      render();
    } else {
      if (action in this.actions) {
        this.actions[action]({ id });
      }
    }
  });

  const render = () => {
    $nav.innerHTML = `
    <div class="navigation_header">😄 Hee Notion</div>
    <div class="navigation_content">
      ${this.state.documents
        .map((document) =>
          NavigationCard({
            id: document.id,
            title: document.title,
            toggle: this.state.toggles[document.id],
          })
        )
        .join("")}
    </div>
    <div class="navigation_footer" data-id="newDocument">
        <img src="/assets/add.svg">
        <span>페이지 추가<span>
    </div>
  `;

    const existingNav = $target.querySelector(".navigation");
    if (existingNav) {
      $target.replaceChild($nav, existingNav);
    } else {
      $target.appendChild($nav);
    }
  };

  render();
}
