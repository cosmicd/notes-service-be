const uuidV1 = require("uuid").v1;
const db = require("./lib/dynamodb");
const response = require("./lib/response");

module.exports.main = (event, context, callback) => {
  //console.log(event, context, callback);
  const origin = event.headers.origin;
  const data = JSON.parse(event.body);
  //console.log(process.env.TableName);process.exit();
  const params = {
    TableName: process.env.TableName,
    Item: {
      hKey: event.requestContext.identity.cognitoIdentityId,
      rKey: uuidV1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: new Date().getTime(),
      updated: "never"
    }
  };
  //console.log(params.Item);
  db
    .execute("put", params)
    .then(result => callback(null, response.success(origin, params.Item)))
    .catch(err => callback(null, response.failure(origin, { status: false })));
};
