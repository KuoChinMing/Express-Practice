const express = require("express");
const router = express.Router();
// const data = require("../data");
const todoModel = require("../model/todo/main");

// (async () => {
// let result = await todoModel.create(data);
// console.log(result);
// result = await model.read({ message: "mmm" });
// console.log(result);
// })();

router.use((req, res, next) => {
  console.log("request comming...");
  next();
});

router.get("/", async (req, res) => {
  const data = await todoModel.read(req.query.searchKeywords);
  console.log(data);
  if (req.xhr) {
    res.render("todos", { todos: data });
  } else {
    res.render("home", { todos: data });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await todoModel.update({
      id: Number(req.params.id),
      text: req.body.text
    });
    res.json({});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await todoModel.delete({ id: Number(req.params.id) });
    res.json({});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  // console.log(req.params.id);
});

router.post("/", async (req, res) => {
  try {
    await todoModel.create(req.body);
    res.json({});
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
