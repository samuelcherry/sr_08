import { useState, useEffect } from "react";
import fetchPosts from "../API/fetchPosts";
import deletePosts from "../API/deletePosts";

interface Posts {
  userId: string;
  postId: string;
  content: string;
  username: string;
}

interface MainContentProps {
  posts: any;
  setPosts: any;
  onRefresh: any;
}

const MainContent = ({ posts, setPosts, onRefresh }: MainContentProps) => {
  const handleDelete = async (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    deletePosts(postId);
    onRefresh();
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {posts.map((message: Posts) => (
          <>
            <div className="bg-gray-400 w-1/5 rounded-lg m-5 p-5">
              <div key={message.postId}>
                <p className="text-white font-bold">{message.username}</p>
                <p className="text-white">{message.content}</p>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    handleDelete(e, message.postId);
                  }}
                  className="p-2 m-2 bg-white! rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default MainContent;
