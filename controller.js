const mockData = require("./mockData");
const model = require("./model/model");

(async () => {
let result = await model.create(mockData);
console.log(result);
result = await model.read({ message: "mmm" });
console.log(result);
})();

model.update({id:1, message: "qwerqwer"}, res => {
  console.log(res);
});

// model.delete({id: 1}, res => {
//   console.log(res);
// });
