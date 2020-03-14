const client = require("./connect");

module.exports = async todo => {
  try {
    const collection = client.db("Todolist").collection("Todolist");
    const result = await collection.findOneAndUpdate(
      { id: todo.id },
      { $set: { text: todo.text } },
      { returnOriginal: false }
    );
    return result.value;
  } catch (error) {
    console.log(error);
  }
};
