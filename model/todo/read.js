const client = require("./connect");

module.exports = async searchKeywords => {
  try {
    const collection = client.db("Todolist").collection("Todolist");
    const query = searchKeywords
      ? { text: { $regex: `.*${searchKeywords}.*` } }
      : {};
    const result = await collection.find(query).sort({'id': -1}).toArray();
    return result;
  } catch (error) {
    console.log(error);
  }
};
