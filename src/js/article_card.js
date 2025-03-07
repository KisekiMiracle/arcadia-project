import homeCSS from "/src/css/home.css?raw";

// Define the Web Component
customElements.define(
  "article-card",
  class extends HTMLElement {
    constructor() {
      super();

      // Attach a shadow root
      const shadowRoot = this.attachShadow({ mode: "open" });

      // Add a spinner to the light DOM while the component loads
      this.innerHTML = `<p class="loader">LOADING...</p>`;

      // Add a slot to the Shadow DOM to project the spinner
      shadowRoot.innerHTML = `<slot></slot>`;

      // Adopt the stylesheet
      const css = new CSSStyleSheet();
      css.replaceSync(homeCSS);
      shadowRoot.adoptedStyleSheets = [css];
    }

    async connectedCallback() {
      // Fetch the HTML template for the card
      const templateHTML = await fetch("/src/assets/components/article_card.html").then((res) => res.text());

      // Render the template and data into the Shadow DOM
      this.renderComponent(templateHTML);

      // Remove the spinner from the light DOM
      this.querySelector(".loader").remove();
    }

    renderComponent(templateHTML) {
      // Create a container for the template
      const template = document.createElement("div");
      template.classList.add("c-article-card");
      template.innerHTML = templateHTML;

      // ? Create a new Lorem Picsum and embed it
      template.querySelector("img").setAttribute("src", "https://picsum.photos/200/300");

      // TODO Inject data into the template

      // Append the template to the Shadow DOM
      this.shadowRoot.appendChild(template);
    }
  }
);

// Function to load the devlog card (if needed for manual initialization)
export async function loadDevlogCard() {
  // Ensure the component is defined
  if (!customElements.get("article-card")) {
    await customElements.whenDefined("article-card");
  }
}
