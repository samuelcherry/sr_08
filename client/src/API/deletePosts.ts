const deletePosts = async (postId: string) => {
  const response = await fetch(`http://localhost:3000/posts/${postId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Delete Failed");
  }
  console.log("DELETED POST");

  return await response.json();
};

export default deletePosts;
