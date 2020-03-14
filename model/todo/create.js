const client = require("./connect");

module.exports = async todo => {
  try {
    const collection = client.db("Todolist").collection("Todolist");
    const maxIdDoc = await collection
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    todo.id = maxIdDoc[0] ? maxIdDoc[0].id + 1 : 0;
    const result = await collection.insertOne(todo);
    return result.result;
  } catch (error) {
    console.log(error);
  }
};
