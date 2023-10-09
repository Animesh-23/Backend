const express = require("express");
const app = express();
const friendRouter = require("./routes/friendRouter");
app.use(express.json());
app.use("/friends", friendRouter);

app.listen(3000, () => {
  console.log("Server is running");
});
