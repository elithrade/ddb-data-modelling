const AWS = require("aws-sdk");
const uuid = require("uuid/v4");

AWS.config.update({ region: "ap-southeast-2" });

var args = process.argv.slice(2);

if (args.length === 0 || args.length > 3) {
  console.log(
    "Usage: node create-employee.js <id of organization> <name> <email>"
  );
  return;
}

const orgId = args[0];
const employeeId = uuid();
const employeeName = args[1];
const employeeEmail = args[2];

var params = {
  TableName: "next-live-dev",
  Item: {
    PK: `ORG#${orgId}`,
    SK: `EMP#${employeeId}`,
    DATA: `EMP#${employeeName}`,
    name: `${employeeName}`,
    email: `${employeeEmail}`,
    projectId: `${employeeId}`
  }
};

var documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.put(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});
