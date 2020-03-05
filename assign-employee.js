const AWS = require("aws-sdk");
const uuid = require("uuid/v4");

AWS.config.update({ region: "ap-southeast-2" });

var args = process.argv.slice(2);

if (args.length === 0 || args.length > 3) {
  console.log(
    "Usage: node assign-employee.js <id of organization> <id of project> <id of employee>"
  );
  return;
}

const orgId = args[0];
const projectId = args[1];
const employeeId = args[2];

var params = {
  TableName: "next-live-dev",
  Item: {
    PK: `ORG#${orgId}#PRO#${projectId}`,
    SK: `ORG#${orgId}#EMP#${employeeId}`,
    name: "Find emplyee name using employeeId",
    project: "Find project name using projectId",
    dateOfJoin: new Date().toUTCString()
  }
};

var documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.put(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});

