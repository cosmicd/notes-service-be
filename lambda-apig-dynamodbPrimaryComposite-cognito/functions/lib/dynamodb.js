//import {DocumentClient} from "aws-sdk/clients/dynamodb";
const DocumentClient = require('aws-sdk/clients/dynamodb').DocumentClient;

const clt = new DocumentClient({
    apiVersion: '2012-08-10',
    region: process.env.TableRegion
});
module.exports.execute=(action, params) =>{
  return clt[action](params).promise();
}



