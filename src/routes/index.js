export const renderPage = ({ $target, routes }) => {
  const path = window.location.pathname || "/";
  const pathToRegex = (path) =>
    new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

  const route = routes.find((route) => {
    return path.match(pathToRegex(route.path));
  });

  if (route && route.element && typeof route.element.render === "function") {
    $target.appendChild(route.element.render());
  } else {
    $target.innerHTML = "404 Page Not Found";
  }
};

export const push = (nextUrl) => {
  window.history.pushState(null, null, nextUrl);
  window.dispatchEvent(new Event("popstate"));
};

const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });

  window.addEventListener("popstate", onRoute);
};

export const routeChange = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent("route-change", {
      detail: {
        nextUrl,
      },
    })
  );
};
