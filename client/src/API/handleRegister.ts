import { useNavigate } from "react-router-dom";

const handleRegister = async (
  e: React.ChangeEvent,
  username: string,
  email: string,
  password: string,
) => {
  const navigate = useNavigate();

  e.preventDefault();
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      navigate("/login");
    }
  } catch (error) {}
};

export default handleRegister;
