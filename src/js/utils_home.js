// ! Retrieve Blog Posts data from the server
async function retrieveData() {
  try {
    const response = await fetch("https://d1-arcadiaproject.luisazaldegui99.workers.dev/api/blog_posts");
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// TODO Dynamically create cards content
export async function embedArticleCards() {
  // Get the parent container of the Article Cards
  const container = document.querySelector(".c-devlog-container");
  if (!container) {
    console.error("Container '.c-devlog-container' not found");
    return;
  }

  const data = await retrieveData();

  for (let i = 0; i < data.length; i++) {
    // Create a new <article-card> element
    const newItem = document.createElement("article-card");
    console.log(data);

    // Pass data to the element using attributes
    newItem.setAttribute("data-title", data[i].title);
    newItem.setAttribute("data-publish-date", data[i].publish_date);
    newItem.setAttribute("data-summary", data[i].summary);

    // Append the new element to the container
    container.appendChild(newItem);
  }
}
