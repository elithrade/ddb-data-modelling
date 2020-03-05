const AWS = require("aws-sdk");
const uuid = require("uuid/v4");

AWS.config.update({ region: "ap-southeast-2" });

var args = process.argv.slice(2);

if (args.length === 0 || args.length > 2) {
  console.log(
    "Usage: node get-emplyees-assigned <id of organization> <id of project>"
  );
  return;
}

const orgId = args[0];
const projectId = args[1];

var params = {
  TableName: "next-live-dev",
  KeyConditionExpression: "#PK = :PK",
  ExpressionAttributeNames: { "#PK": "PK" },
  ExpressionAttributeValues: {
    ":PK": `ORG#${orgId}#PRO#${projectId}`
  }
};

var documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.query(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});
