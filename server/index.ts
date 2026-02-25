import express from "express";
import cors from "cors";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const DB_PASSWORD = process.env.DB_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not in .env file");
}

const pool = new Pool({
  user: "postgres",
  database: "sr_08",
  host: "localhost",
  password: "password",
  port: 5432,
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const registerQuery = await pool.query(
      `
        INSERT INTO users(username, email, password)
        VALUES($1, $2, $3)
        RETURNING id,username,email, created_at
        `,
      [username, email, passwordHash],
    );

    const response = await registerQuery.rows[0];

    return res
      .status(200)
      .json({ message: "Registration successful", response });
  } catch (err) {
    return res.status(500).json({ message: "Registration Failed", err });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginQuery = await pool.query(
      `
                SELECT * FROM users WHERE email = $1
            `,
      [email],
    );

    const user = loginQuery.rows[0];

    if (loginQuery.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        id: user.id,
      },
      JWT_SECRET,
      { expiresIn: "1hr" },
    );

    return res
      .status(200)
      .json({ message: "Login Successful ", token, userId: user.id });
  } catch (error) {
    console.error("Error: ", error);
    console.log("catch");
    return res.status(500).json({ message: "Login Faild", error });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { content, userId } = req.body;
    const postAddQuery = await pool.query(
      `
                INSERT INTO posts(content, "userId")
                VALUES($1,$2)
                RETURNING "postId", "userId", content
            `,
      [content, userId],
    );

    const response = postAddQuery.rows[0];
    console.log("userId in index:", userId);
    return res.status(201).json({ message: "Post Successful", response });
  } catch (error) {
    return res.status(500).json({ message: "Posting Error", error });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT
            posts.*,
            users.username
        FROM posts
        JOIN users
            ON posts."userId" = "id"
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("fetch Error");
    res.json({ message: "Fetch errors" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
            DELETE FROM posts WHERE "postId" = $1
            RETURNING *
            `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({
      message: "Deleted post successfully",
      deletedPost: result.rows[0],
    });
  } catch (error) {
    console.error("delete error:", error);
    res.status(500).json({ message: "Delete failed", error });
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
