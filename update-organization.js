const AWS = require("aws-sdk");
const uuid = require("uuid/v4");

AWS.config.update({ region: "ap-southeast-2" });

var args = process.argv.slice(2);

if (args.length === 0 || args.length > 1) {
  console.log("Usage: node update-organization <id of organization>");
  return;
}

// Finds the organization with the given id and adds a new attribute called 'orgId' to the item
const orgId = args[0];

var params = {
  TableName: "next-live-dev",
  // Primary key used to identify an organization
  Key: { PK: `ORG#${orgId}`, SK: `#METADATA#${orgId}` },
  UpdateExpression: "set #orgId = :orgId",
  // Place holders for attribute and value
  ExpressionAttributeNames: { "#orgId": "orgId" },
  ExpressionAttributeValues: {
    ":orgId": orgId
  }
};

var documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.update(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});
