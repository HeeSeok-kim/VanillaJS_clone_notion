import DefaultDocument from "./pages/DefaultDocument.js";
import { initRouter } from "./routes/index.js";
import Navigation from "./components/Navigation/Navigation.js";
import DocumentPage from "./pages/DocumentPage.js";
import { defaultDocument } from "./constants/documentTemplate.js";
import { getItem } from "./utils/storage.js";

export default class App {
  constructor({ $target }) {
    this.$target = $target;
    initRouter(this.route.bind(this)); // history 변경 감지,
    window.addEventListener("popstate", this.route.bind(this));
    this.route();
  }

  route() {
    this.state = defaultDocument;
    const result = getItem("document");
    if (result) {
      this.state = JSON.parse(result);
    }

    const { pathname } = location;
    this.$target.innerHTML = "";
    const navigation = new Navigation({
      $target: this.$target,
      props: this.state,
    });

    if (pathname === "/") {
      navigation.view();
      new DefaultDocument({ $target: this.$target });
    } else if (pathname.indexOf("documents") === 1) {
      const [, , documentId] = pathname.split("/");
      navigation.view();
      new DocumentPage({
        $target: this.$target,
        props: { documentId, navigation },
      });
    }
  }
}
