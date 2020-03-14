const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// const client = new MongoClient(url, { useNewUrlParser: true });
(async () => {
  await client.connect();
})();

module.exports = client;