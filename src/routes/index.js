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
