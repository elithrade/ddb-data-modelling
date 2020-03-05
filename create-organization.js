const AWS = require("aws-sdk");
const uuid = require("uuid/v4");

AWS.config.update({ region: "ap-southeast-2" });

var args = process.argv.slice(2);

if (args.length === 0 || args.length > 1) {
  console.log("Usage: node create-organization <name of organization>");
  return;
}

const orgId = uuid();
const orgName = args[0];

var params = {
  TableName: "next-live-dev",
  Item: {
    PK: `ORG#${orgId}`,
    SK: `#METADATA#${orgId}`,
    DATA: `ORG#${orgName}`,
    name: orgName
  }
};

var documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.put(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});
