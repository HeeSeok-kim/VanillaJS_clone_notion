import DefaultDocument from "./pages/DefaultDocument.js";
import { initRouter } from "./routes/index.js";
import Navigation from "./components/Navigation/Navigation.js";
import DocumentPage from "./pages/DocumentPage.js";

export default class App {
  constructor({ $target }) {
    this.$target = $target;
    initRouter(this.route.bind(this)); // history 변경 감지,
    window.addEventListener("popstate", this.route.bind(this));
    this.route();
  }

  route() {
    const { pathname } = location;

    new Navigation({
      $target: this.$target,
    });

    if (pathname === "/") {
      new DefaultDocument({ $target: this.$target });
    } else if (pathname.indexOf("documents") === 1) {
      const [, , documentId] = pathname.split("/");
      new DocumentPage({ $target: this.$target, props: documentId });
    }
  }
}
