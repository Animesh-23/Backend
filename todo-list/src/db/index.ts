import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: String,
  password: String,
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

const todoSchema = new Schema({
  id: String,
  title: String,
  isCompleted: { type: Boolean, default: false },
});

const User = model("User", userSchema);
const Todo = model("Todo", todoSchema);

export { User, Todo };
