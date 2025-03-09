import { marked } from "marked";

// Override Renderer function from Marked
// See: https://marked.js.org/using_pro
const renderer = {
  heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");

    return `
            <h1 id="${escapedText}">
              ${text}
            </h1>`;
  },
};

marked.use({ breaks: true, gfm: true, renderer });

// ? Retrieve Blog Posts data from the server
async function retrieveBlogContent() {
  const dataToSend = {
    url: window.location.pathname,
  };

  try {
    const response = await fetch("https://d1-arcadiaproject.luisazaldegui99.workers.dev/api/blog_contents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// ? Renders Markdown Content onto the page
function renderMarkdown(data) {
  const content = data.content;

  document.getElementById("blog-content").innerHTML = marked.parse(content);
}

// ? Replace Relevant Contents onto the page
function renderHeadings(data) {
  console.log(data);
  // Retrieve elements
  const title = document.querySelector(".c-devlog-title");
  const subtitle = document.querySelector(".c-devlog-subtitle");

  // Replace contents
  title.innerText = data.title;
  subtitle.innerText = data.subtitle;
}

// ? Creates a template for Indexing and Renders it
function renderIndex() {
  // Retrieve all Sections
  const sections = document.querySelectorAll("h1");

  // Create Index Link template
  const template = document.createElement("li");
  template.innerHTML = `
    <li>
      <a class="c-link-regular" href="#"></a>
    </li>
`;

  // Retrieve UL element
  const ul = document.querySelector(".c-index-title ~ ul");

  for (let i = 1; i < sections.length; i++) {
    const element = template.cloneNode({ deep: true });
    const text = sections[i].innerText;
    const ref = sections[i].getAttribute("id") || sections[i].innerText.toLocaleLowerCase().split(" ").join("-");

    element.querySelector("a").innerText = text;
    i != 1 ? element.querySelector("a").setAttribute("href", `#${ref}`) : null;

    ul.appendChild(element);
  }
}

// ? Renders the current entry's category tag
function renderTag(data) {
  const tag = document.querySelector(".c-devlog-tag");
  tag.innerText = data.category;
}

// ? Renders the Author's info
function renderAuthorInfo(data) {
  const author = document.querySelector(".c-devlog-info-author");
  const str = `Author: ${data.author}`;
  author.innerText = str;
}

// ? Renders the Publishing date
function renderDateInfo(data) {
  const date = document.querySelector(".c-devlog-info-date");
  date.innerText = data.publish_date;
}

export async function renderBlogContent(location) {
  if (location.includes("/devlog/")) {
    const data = await retrieveBlogContent();

    renderMarkdown(data);
    renderHeadings(data);
    renderIndex();
    renderTag(data);
    renderAuthorInfo(data);
    renderDateInfo(data);
  }
}
