const handleLogin = async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log("response: ", data);
    if (response.ok) {
      console.log("Login Successful");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      console.log("userId in Login.tsx: ", data.token.id);
    } else {
      console.error("Login error");
    }
  } catch (error) {
    console.error("Login Failed", error);
  }
};

export default handleLogin;
