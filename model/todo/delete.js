const client = require("./connect");

module.exports = async todo => {
  try {
    // await client.connect();
    const collection = client.db("Todolist").collection("Todolist");
    await collection.deleteOne({ id: todo.id });
    return "Document Removed Successfully!";
  } catch (error) {
    console.log(error);
  }
};
