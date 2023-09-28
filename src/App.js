import DefaultDocument from "./pages/DefaultDocument.js";
import DocumentPage from "./pages/DocumentPage.js";
import { renderPage } from "./routes/index.js";
import Navigation from "./components/Navigation/Navigation.js";
import Test from "./pages/test.js";
import { defaultDocument } from "./constants/index.js";
import { getItem } from "./utils/storage.js";

export default class App {
  constructor({ $target }) {
    this.$target = $target;

    this.state = defaultDocument;
    const result = getItem("document");
    if (result) {
      this.state = JSON.parse(result);
    }

    this.render();
  }

  render() {
    const $navigation = new Navigation({
      $target: this.$target,
      props: this.state,
    });
  }
}
