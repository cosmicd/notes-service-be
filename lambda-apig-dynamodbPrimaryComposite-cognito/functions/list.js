const db = require("./lib/dynamodb");
const response = require("./lib/response");

module.exports.main = (event, context, callback) => {
  const origin = event.headers.origin;
  const params = {
    TableName: process.env.TableName,
    KeyConditionExpression: "hKey = :hKey",
    ExpressionAttributeValues: {
      ":hKey": event.requestContext.identity.cognitoIdentityId
    }
  };
  db
    .execute("query", params)
    .then(result => callback(null, response.success(origin, result.Items)))
    .catch(err => callback(null, response.failure(origin, { status: false })));
};
