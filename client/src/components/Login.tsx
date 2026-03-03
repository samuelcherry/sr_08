import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import handleLogin from "../API/handleLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/register");
  };

  const login = (e: React.ChangeEvent) => {
    e.preventDefault();
    handleLogin(email, password);
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-center">
        <form
          onSubmit={login}
          className="bg-gray-400 p-5 m-5 w-1/5 rounded-lg flex flex-col items-center"
        >
          <div className="flex flex-col items-center">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-white w-full p-4 m-2"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="bg-white w-full p-4 m-2"
            />
          </div>
          <div className="flex justify-between w-full">
            <button type="submit" className="bg-white! rounded-lg p-2 m-2">
              Login
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="bg-white rounded-lg p-2 m-2 "
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
