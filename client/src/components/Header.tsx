import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface headerProps {
  onCreatePosts: () => void;
}

const Header = ({ onCreatePosts }: headerProps) => {
  const navigate = useNavigate();

  const [post, setPost] = useState("");

  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.error("no userId");
    return;
  }

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handlePost = async (e: React.ChangeEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: post, userId }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("data: ", data);
        onCreatePosts();
      }
    } catch (error) {}
  };

  return (
    <div className="bg-gray-400 flex flex-col items-end">
      <button
        type="button"
        onClick={handleLogout}
        className="bg-white p-2 m-2 rounded-lg"
      >
        {" "}
        Log Out
      </button>
      <form onSubmit={handlePost}>
        <input
          onChange={(e) => {
            setPost(e.target.value);
          }}
          className="bg-white!"
        />
        <button type="submit" className="bg-white! p-2 m-2 rounded-lg">
          {" "}
          POST{" "}
        </button>
      </form>
    </div>
  );
};

export default Header;
