export async function loadDevlogCard() {
  console.log("This is a test sent from another js file!");

  // Create a new HTML template for this element
  let template = document.createElement("div");

  // Setup class on the container and HTML content
  template.classList.add("c-article-card");
  const element__card = await fetch("/src/assets/components/article_card.html").then((res) => res.text());
  template.innerHTML = element__card;

  for (let i = 0; i < 4; i++) {
    // Create a copy of the template
    let instance = template.cloneNode(true);

    // Retrieve container for the DevLog Posts Section and insert it
    const container = document.querySelector(".c-devlog-container");
    container.appendChild(instance);
  }
}
