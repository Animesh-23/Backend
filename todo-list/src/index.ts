import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Todo, User } from "./db/index.js";
import jwt, { JwtPayload } from "jsonwebtoken";
const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/TodoList");

const secret = "SeCrEt";

interface customRequest extends Request {
  user?: String | JwtPayload;
}

const authenticate = (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.json({ msg: "Authorization failed" });
        return;
      }
      if (decoded) {
        req.user = decoded;
      }
      next();
    });
  }
};

app.get("/", (_req, res: Response) => {
  res.send("Hello");
});

app.post("/signup", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      todos: [],
    });
    await newUser.save();
    const token = jwt.sign(req.body.username, secret);
    res.json({ msg: "User created succesfully", token });
  } else {
    res.json({ msg: "Already existed user" });
  }
});
app.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && user.password === req.body.password) {
    const token = jwt.sign(req.body.username, secret);
    res.json({ msg: "Logged in succesfully", token });
  } else {
    res.json({ msg: "Account not found" });
  }
});
app.post("/user/addtodo", authenticate, async (req: customRequest, res) => {
  const user = await User.findOne({ username: req.user });
  if (user) {
    const todo = new Todo({ title: req.body.title });
    await todo.save();
    user.todos.push(todo._id);
    await user.save();
    res.json({ msg: "Todo added succesfully", id: todo._id });
  } else {
    res.json({ msg: "User not found" });
  }
});
app.delete(
  "/user/deletetodo/:id",
  authenticate,
  async (req: customRequest, res) => {
    const user = await User.findOne({ username: req.user });
    if (user) {
      user.todos.pull(req.params.id);
      await user.save();
      await Todo.findByIdAndRemove({ _id: req.params.id });
      res.json({ msg: "Todo deleted succesfully" });
    } else {
      res.json({ msg: "User not found" });
    }
  }
);
app.get("/user/todos", authenticate, async (req: customRequest, res) => {
  let user = await User.findOne({ username: req.user });
  if (user) {
    user = await user.populate("todos");
    res.json({ todos: user.todos });
  }
});
app.get("/todos", authenticate, async (_req, res) => {
  const todos = await Todo.find({});
  if (todos) {
    res.json({ todos });
  }
});
app.put("/user/updatetodo/:id", authenticate, async (req, res) => {
  Todo.findOne({ _id: req.params.id })
    .then((todo) => {
      if (todo) {
        todo.title = req.body.title;
        todo.save();
        res.json({ todo });
      }
    })
    .catch((e) => {
      res.json({ msg: "Error occured", error: e });
    });
});
app.put(
  "/user/complete/:id",
  authenticate,
  async (req: Request, res: Response) => {
    Todo.findOne({ _id: req.params.id })
      .then((todo) => {
        if (todo) {
          todo.isCompleted = !todo.isCompleted;
          todo.save();
          res.json({ todo });
        }
      })
      .catch((_e) => {
        res.json({ msg: "Error occured" });
      });
  }
);
app.listen(3000, () => console.log("Server running on port 3000"));
