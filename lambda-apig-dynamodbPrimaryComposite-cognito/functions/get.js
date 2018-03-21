const db = require("./lib/dynamodb");
const response = require("./lib/response");

module.exports.main=(event, context, callback) =>{
  const origin=event.headers.origin;
  const params = {
    TableName: process.env.TableName,

    Key: {
      hKey: event.requestContext.identity.cognitoIdentityId,
      rKey: event.pathParameters.id
    }
  };
  db
    .execute("get", params)
    .then(result => result.Item? 
      callback(null, response.success(origin, result.Item))
      :
      callback(null, response.failure(origin,{ status: false, error: 'Item not found.' }))
    )
    .catch(err => callback(null, response.failure(origin, { status: false })));

}
