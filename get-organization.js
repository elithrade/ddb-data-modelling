const AWS = require("aws-sdk");
const uuid = require("uuid/v4");

AWS.config.update({ region: "ap-southeast-2" });

var args = process.argv.slice(2);

if (args.length === 0 || args.length > 1) {
  console.log("Usage: node get-organization <id of organization>");
  return;
}

const orgId = args[0];

var params = {
  TableName: "next-live-dev",
  Key: {
    PK: `ORG#${orgId}`,
    SK: `#METADATA#${orgId}`
  }
};

var documentClient = new AWS.DynamoDB.DocumentClient();

// Expecting one result
documentClient.get(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});
