var AWS = require("aws-sdk");

var credentials = new AWS.SharedIniFileCredentials({profile: 'my-dynamo'});

AWS.config.update({
  region: "us-east-1",
  credentials,
});


var docClient = new AWS.DynamoDB.DocumentClient();

const tableName = 'Communication';

const params = {
  TableName: tableName,
  Item: {
    
  }
}

docClient.put(params, (err, data) => {
  if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
  }
})