const AWS = require("aws-sdk");
const uuid = require("uuid/v4");

AWS.config.update({ region: "ap-southeast-2" });

var args = process.argv.slice(2);

if (args.length === 0 || args.length > 1) {
  console.log("Usage: node get-organization-projects <id of organization>");
  return;
}

const orgId = args[0];

var params = {
  TableName: "next-live-dev",
  KeyConditionExpression: "#PK = :PK and begins_with(#SK, :SK)",
  // Use expression attributes
  ExpressionAttributeNames: { "#PK": "PK", "#SK": "SK" },
  ExpressionAttributeValues: {
    ":PK": `ORG#${orgId}`,
    ":SK": "PRO#"
  }
};

var documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.query(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});
