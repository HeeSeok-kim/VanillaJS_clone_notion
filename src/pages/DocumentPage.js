import { defaultDocument } from "../constants/index.js";
import { getItem } from "../utils/storage.js";
import Header from "../components/Header/index.js";
import Editor from "../components/Editor/index.js";

export default function DocumentPage(pageRender) {
  const pathname = location.pathname;
  const id = pathname.split("/documents/")[1];
  this.state = defaultDocument;
  const result = getItem("document");
  if (result) {
    this.state = JSON.parse(result);
  }
  const { detailDocument } = this.state;
  const $documentContainer = document.createElement("div");
  $documentContainer.className = "document_container";

  this.render = () => {
    $documentContainer.innerHTML = `
       ${Header({ title: detailDocument[id].title })}
       ${Editor(this.state)}
      
    `;
    return $documentContainer;
  };
}
