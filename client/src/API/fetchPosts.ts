const fetchPosts = async () => {
  try {
    const response = await fetch("http://localhost:3000/posts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("response", response);
      return response.json();
    }
  } catch (error) {
    console.error("Fetch Error", error);
  }

  console.log("FETCH POSTS");
};

export default fetchPosts;
