const AWS = require("aws-sdk");
const uuid = require("uuid/v4");

AWS.config.update({ region: "ap-southeast-2" });

var args = process.argv.slice(2);

if (args.length === 0 || args.length > 2) {
  console.log(
    "Usage: node create-project <id of organization> <name of project>"
  );
  return;
}

const orgId = args[0];
const projectId = uuid();

var params = {
  TableName: "next-live-dev",
  Item: {
    PK: `ORG#${orgId}`,
    SK: `PRO#agile#${projectId}`,
    name: `${args[1]}`,
    projectId: `${projectId}`
  }
};

var documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.put(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});
