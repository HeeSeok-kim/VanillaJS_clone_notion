import DefaultDocument from "./pages/DefaultDocument.js";
import DocumentPage from "./pages/DocumentPage.js";
import { renderPage } from "./routes/index.js";
import Navigation from "./components/Navigation/Navigation.js";

export default function App({ $target }) {
  const routes = [
    {
      path: "/",
      element: new DefaultDocument(),
    },
    {
      path: "/documents/:documentId",
      element: new DocumentPage(),
    },
  ];
  const pageRender = () => {
    $target.innerHTML = "";
    new Navigation({ $target, pageRender });
    renderPage({ $target, routes });
  };

  pageRender();
}
