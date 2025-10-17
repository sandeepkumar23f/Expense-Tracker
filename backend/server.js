import express from "express";
import { connection, collectionName } from "./dbconfig.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://track-your-expense-r8m6.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Handle preflight requests globally
app.options("*", cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


app.post("/signup", async (req, res) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection("users");

    const result = await collection.insertOne(userData);
    if (result.acknowledged) {
      const tokenData = { _id: result.insertedId, email: userData.email };
      jwt.sign(tokenData, SECRET_KEY, { expiresIn: "5d" }, (error, token) => {
        if (error)
          return res.status(500).send({ success: false, message: "JWT Error" });

        res.cookie("token", token, {
          httpOnly: true,
          secure: true, 
          sameSite: "none", 
          maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
        });

        res.send({ success: true, message: "Signup Successful" });
      });
    } else {
      return res.send({ success: false, message: "Signup Failed" });
    }
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ success: false, message: "All fields required" });
  }

  const db = await connection();
  const collection = db.collection("users");

  const user = await collection.findOne({ email, password });
  console.log("Login request body:", req.body);
  console.log("SECRET_KEY:", SECRET_KEY);

  if (!user) {
    return res
      .status(401)
      .send({ success: false, message: "Invalid Email or Password" });
  }

  const tokenData = { _id: user._id, email: user.email };
  jwt.sign(tokenData, SECRET_KEY, { expiresIn: "5d" }, (error, token) => {
    if (error) {
      return res.status(500).send({ success: false, message: "JWT Error" });
    }

    res.cookie("token", token, {
          httpOnly: true,
          secure: true, 
          sameSite: "none", 
          maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
        });
    res.send({ success: true, message: "Login Successful" });
  });
});

app.post("/add-expense", verifyJWTToken, async (req, res) => {
  try {
    const expense = {
      ...req.body,
      userId: new ObjectId(req.user._id),
      createdAt: new Date(),
      date: req.body.date || new Date(),
    };
    if (!expense.title || !expense.amount) {
      return res.status(400).json({
        success: false,
        message: "Title and amount are required",
      });
    }
    const db = await connection();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(expense);
    if (result.acknowledged) {
      return res.status(200).json({
        success: true,
        message: "New Expense added successfully",
        result,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Error Expense not added",
      });
    }
  } catch (error) {
    console.error("Error adding expense: ", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
app.get("/expenses", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = await db.collection(collectionName);

    const expenses = await collection
      .find({ userId: new ObjectId(req.user._id) })
      .toArray();

    // const expenses = await collection.find({}).toArray();

    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      expenses,
    });
  } catch (err) {
    console.error("Error Fetching Expenses", err);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
});

app.delete("/delete/:id", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection(collectionName);
    const { id } = req.params;

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      userId: new ObjectId(req.user._id),
    });

    if (result.deletedCount > 0) {
      res
        .status(200)
        .json({ success: true, message: "Expense deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }
  } catch (err) {
    console.error("Error deleting expense", err.message);
    res.status(500).json({ success: false, message: "Error deleting expense" });
  }
});

app.get("/expense/:id", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection(collectionName);
    const { id } = req.params;
    const result = await collection.findOne({
      _id: new ObjectId(id),
      userId: new ObjectId(req.user._id),
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Expense fetched successfully",
      expense: result,
    });
  } catch (err) {
    console.error("Error fetching task", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      err: err.message,
    });
  }
});

app.put("/update-expense/:id", verifyJWTToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = await db.collection(collectionName);
    const { id } = req.params;
    const { title, amount, category, date } = req.body;

    const update = { $set: { title, amount, category, date } };
    const result = await collection.updateOne(
      { _id: new ObjectId(id), userId: new ObjectId(req.user._id) },
      update
    );

    if (result.modifiedCount > 0) {
      res
        .status(200)
        .json({ success: true, message: "Expense updated successfully" });
    } else {
      res
        .status(404)
        .json({
          success: false,
          message: "Expense not found or not change made",
        });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", err: err.message });
  }
});
function verifyJWTToken(req, res, next) {
  const token = req.cookies["token"];
  if (!token) {
    return res.status(401).json({ success: false, message: "No token found" });
  }

  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token", success: false });
    }

    req.user = decoded;
    next();
  });
}

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
