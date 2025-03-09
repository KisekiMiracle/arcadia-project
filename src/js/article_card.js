import homeCSS from "/src/css/home.css?raw";

class ArticleCard extends HTMLElement {
  constructor() {
    super();

    // Attach a shadow root
    const shadowRoot = this.attachShadow({ mode: "open" });

    // Add a spinner to the Shadow DOM while the component loads
    shadowRoot.innerHTML = `
      <style>
        .loader {
          font-size: 1.2rem;
          color: #333;
        }
      </style>
      <p class="loader">LOADING...</p>
    `;

    // Adopt the stylesheet
    const css = new CSSStyleSheet();
    css.replaceSync(homeCSS);
    shadowRoot.adoptedStyleSheets = [css];
  }

  async connectedCallback() {
    try {
      // Fetch the HTML template for the card
      const templateHTML = await fetch("/src/assets/components/article_card.html").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch template");
        return res.text();
      });

      // Render the template and data into the Shadow DOM
      this.renderComponent(templateHTML);

      // Remove the spinner from the Shadow DOM
      this.shadowRoot.querySelector(".loader")?.remove();
    } catch (error) {
      console.error("Error loading article card:", error);
      this.shadowRoot.innerHTML = `<p class="error">Failed to load content.</p>`;
    }
  }

  disconnectedCallback() {
    console.log("Custom element removed from the page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
  }

  renderComponent(templateHTML) {
    // Create a container for the template
    const template = document.createElement("div");
    template.classList.add("c-article-card");
    template.innerHTML = templateHTML;

    // Use the data passed via attributes
    const title = this.getAttribute("data-title");
    const publishDate = this.getAttribute("data-publish-date");
    const summary = this.getAttribute("data-summary");

    // Update the template with the data
    if (template.querySelector("h3")) {
      template.querySelector("h3").textContent = title;
    }
    if (template.querySelector("p")) {
      template.querySelector("p").textContent = publishDate;
    }
    if (template.querySelector(".c-article-card-summary p")) {
      template.querySelector(".c-article-card-summary p").textContent = summary;
    }

    // Set a random Lorem Picsum image
    const img = template.querySelector("img");
    if (img) {
      img.setAttribute("src", "https://picsum.photos/200/300");
    }

    // Append the template to the Shadow DOM
    this.shadowRoot.appendChild(template);
  }
}

// Register the custom element
customElements.define("article-card", ArticleCard);
