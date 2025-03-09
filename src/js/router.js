import * as utils_page_home from "./utils_home.js";
import * as utils_page_devlog_template from "./utils_devlog.js";

const urlPageTitle = "Arcadia Project";
let isAnchorLink = false;

document.addEventListener("click", (e) => {
  const { target } = e;

  // Check if the link is an anchor link
  if (target.matches(".c-index a")) {
    isAnchorLink = true;
    return;
  }

  // Check if the link doesn't need a redirect
  if (!target.matches(".page-header nav a") && !target.matches(".u-redirect")) {
    isAnchorLink = false;
    return;
  }

  isAnchorLink = false;
  e.preventDefault();
  router(e);
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
  "/devlog": {
    template: "/pages/devlog.html",
    title: `DevLog | ${urlPageTitle}`,
    description: "Devlog Page.",
  },
  "/report": {
    template: "/pages/report.html",
    title: `Report | ${urlPageTitle}`,
    description: "Report page.",
  },
  // DevLog Entries
  "/devlog/template": {
    template: "/pages/devlog/devlogTemplate.html",
    title: `DevLog | ${urlPageTitle}`,
    description: "DevlogTemplate",
  },
  // + ============================================== +
  // * DevLog Entries
  // + ============================================== +
  // ? Entry #001
  "/devlog/creating-my-own-website-for-my-own-videogame": {
    template: "/pages/devlog/devlogTemplate.html",
    title: `DevLog | ${urlPageTitle}`,
    description: "DevlogTemplate",
  },
};

const router = (event) => {
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
};

const handleHeaderActivePage = async (location) => {
  switch (location) {
    // Home
    case "/":
      document.querySelectorAll("nav a")[0].classList.add("c-header-item-active");
      utils_page_home.embedArticleCards();
      break;
    // Characters
    case "/characters":
      document.querySelectorAll("nav a")[1].classList.add("c-header-item-active");
      break;
    // Devlog
    case "/devlog":
      document.querySelectorAll("nav a")[2].classList.add("c-header-item-active");
      break;
  }
};

const urlLocationHandler = async () => {
  let location = window.location.pathname;
  if (location.length == 0) {
    location = "/";
  }

  const route = routes[location] || routes[404];
  const html = await fetch(route.template).then((res) => res.text());

  // Page's metadata
  document.querySelector("#app").innerHTML = html;
  document.title = route.title;
  document.querySelector('meta[name="description"]').setAttribute("content", route.description);

  // Setup active page
  handleHeaderActivePage(location);

  // Render Markdown on DevLog Posts
  utils_page_devlog_template.renderBlogContent(location);
};

window.onpopstate = isAnchorLink ? urlLocationHandler : null;
window.route = routes;

urlLocationHandler();
