const AWS = require("aws-sdk");
const uuid = require("uuid/v4");

AWS.config.update({ region: "ap-southeast-2" });

var args = process.argv.slice(2);

if (args.length === 0 || args.length > 3) {
  console.log(
    "Usage: node get-items-by-name <id of organization> <ORG | PRO | EMP> <name>"
  );
  return;
}

const orgId = args[0];
const type = args[1];
const name = args[2];

var params = {
  TableName: "next-live-dev",
  IndexName: "PK-DATA-index",
  KeyConditionExpression: "#PK = :PK and begins_with(#SK, :SK)",
  // Using inverted index, so SK is DATA
  ExpressionAttributeNames: { "#PK": "PK", "#SK": "DATA" },
  ExpressionAttributeValues: {
    ":PK": `ORG#${orgId}`,
    ":SK": `${type}#${name}`
  }
};

var documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.query(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});
