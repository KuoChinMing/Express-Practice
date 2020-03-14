const express = require("express");
const app = new express();
const todoRouter = require("./router/todos");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/todo", todoRouter);
app.use("/note", (req, res) => {
  res.render("note");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listen on ${port}...`);
});
