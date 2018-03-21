const context = "node-lambda-functions local tests";

const callback = (error, response) => {
  console.log("Error:", error);
  console.log("Response:", response);
};
const taskMap = { 
  1: "create",
  2: "get",
  3: "list",
  4: "update",
  5: "delete"
};

// useage: npm run test -- testindex
// where, 0 < testindex < 6.
const runTask = taskIndex => {
  const functionName = taskMap[taskIndex];
  const testThis = require("../functions/" + functionName).main;
  const event = require("../mocks/" + taskMap[taskIndex] + ".json");
  //console.log(event);process.exit(1);
  console.log("test function: " + functionName);
  testThis(event, context, callback);
};
runTask(process.argv[2]); // requires environment vars: TableName, TableRegion
