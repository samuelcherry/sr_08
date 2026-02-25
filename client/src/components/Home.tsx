import Header from "./Header";
import MainContent from "./MainContent";
import { useState, useEffect } from "react";
import fetchPosts from "../API/fetchPosts";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const newPosts = await fetchPosts();
    if (!newPosts) {
      throw new Error("fetch Error");
    }
    console.log("posts", newPosts);
    return setPosts(newPosts);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      <Header onCreatePosts={loadPosts} />
      <MainContent posts={posts} setPosts={setPosts} onRefresh={loadPosts} />
    </>
  );
};

export default Home;
