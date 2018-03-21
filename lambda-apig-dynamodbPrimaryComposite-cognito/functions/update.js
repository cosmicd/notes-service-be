const db = require("./lib/dynamodb");
const response = require("./lib/response");

module.exports.main = (event, context, callback) => {
  const origin=event.headers.origin;
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TableName,
    Key: {
      hKey: event.requestContext.identity.cognitoIdentityId,
      rKey: event.pathParameters.id
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment, updated = :updated',
    ExpressionAttributeValues: {
      ':attachment': data.attachment ? data.attachment : null,
      ':content': data.content ? data.content : null,
      ':updated': new Date().getTime()
    },
    ReturnValues: 'ALL_NEW'
  };

  //console.log(params.Item);
  db
    .execute("update", params)
    .then(result => callback(null, response.success(origin, params)))
    .catch(err => callback(null, response.failure(origin, { status: false })));
};
