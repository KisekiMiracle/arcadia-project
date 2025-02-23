const urlPageTitle = "Arcadia Project";

document.addEventListener("click", (e) => {
  const { target } = e;
  if (!target.matches("nav a")) {
    return;
  }
  e.preventDefault();
  router();
});

const routes = {
  404: {
    template: "/pages/404.html",
    title: `404 | ${urlPageTitle}`,
    description: "Page not found.",
  },
  "/": {
    template: "/pages/home.html",
    title: `Home | ${urlPageTitle}`,
    description: "The Home page.",
  },
  "/characters": {
    template: "/pages/characters.html",
    title: `Characters | ${urlPageTitle}`,
    description: "The Characters page.",
  },
};

const router = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
};

const urlLocationHandler = async () => {
  const location = window.location.pathname;
  if (location.length == 0) {
    location = "/";
  }

  const route = routes[location] || routes[404];
  const html = await fetch(route.template).then((res) => res.text());

  document.querySelector("#app").innerHTML = html;
  document.title = route.title;
  document.querySelector('meta[name="description"]').setAttribute("content", route.description);
};

window.onpopstate = urlLocationHandler;
window.route = routes;

urlLocationHandler();
