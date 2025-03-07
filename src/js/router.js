import * as utils_articleCard from "./article_card.js";
import * as utils_page_home from "./utils_home.js";

const urlPageTitle = "Arcadia Project";

document.addEventListener("click", (e) => {
  const { target } = e;
  if (!target.matches(".page-header nav a")) {
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
  "/report": {
    template: "/pages/report.html",
    title: `Report | ${urlPageTitle}`,
    description: "Report page.",
  },
};

const router = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
};

const handleHeaderActivePage = async (location) => {
  switch (location) {
    case "/":
      document.querySelectorAll("nav a")[0].classList.add("c-header-item-active");
      utils_page_home.retrieveData();
      break;
    case "/characters":
      document.querySelectorAll("nav a")[1].classList.add("c-header-item-active");
      break;
  }
};

const urlLocationHandler = async () => {
  const location = window.location.pathname;
  if (location.length == 0) {
    location = "/";
  }

  const route = routes[location] || routes[404];
  const html = await fetch(route.template).then((res) => res.text());

  // Page's metadata
  document.querySelector("#app").innerHTML = html;
  document.title = route.title;
  document.querySelector('meta[name="description"]').setAttribute("content", route.description);

  // Declare and embed Web Components
  await utils_articleCard.loadDevlogCard(); // ? Web Component: article_card

  // Setup active page
  handleHeaderActivePage(location);
};

window.onpopstate = urlLocationHandler;
window.route = routes;

urlLocationHandler();
