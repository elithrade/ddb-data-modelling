const AWS = require("aws-sdk");
const uuid = require("uuid/v4");

AWS.config.update({ region: "ap-southeast-2" });

var args = process.argv.slice(2);

if (args.length === 0 || args.length > 2) {
  console.log(
    "Usage: node get-projects-assigned <id of organization> <id of emplyee>"
  );
  return;
}

const orgId = args[0];
const employeeId = args[1];

var params = {
  TableName: "next-live-dev",
  IndexName: "PRO-EMP-Index",
  // Using inverted index, so PK is SK
  KeyConditionExpression: "#SK = :SK",
  ExpressionAttributeNames: { "#SK": "SK" },
  ExpressionAttributeValues: {
    ":SK": `ORG#${orgId}#EMP#${employeeId}`
  }
};

var documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.query(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});
