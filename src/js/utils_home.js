// ! Retrieve Blog Posts data from the server
export async function retrieveData() {
  const data = await fetch("https://d1-arcadiaproject.luisazaldegui99.workers.dev/api/blog_posts").then((res) => res.json());
  console.log(data);
  return data;
}

// TODO Dynamically create cards content
