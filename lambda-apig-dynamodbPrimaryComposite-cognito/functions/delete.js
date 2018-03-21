const db = require("./lib/dynamodb");
const response = require("./lib/response");

module.exports.main = (event, context, callback) => {
  const origin = event.headers.origin;
  const params = {
    TableName: process.env.TableName,
    Key: {
      hKey: event.requestContext.identity.cognitoIdentityId,
      rKey: event.pathParameters.id
    }
  };
  //console.log(params.Item);
  db
    .execute("delete", params)
    .then(result => callback(null, response.success(origin, { status: true })))
    .catch(err => callback(null, response.failure(origin, { status: false })));
};
