const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
    "accessKeyId": "",
    "secretAccessKey": "",
    "region": "us-east-1"
});

const table = 'CommunicationTable';


async function getRecipientUser(data) {

    const {
        companyId,
        userType,
        userId,
    } = data;

    const CommunicationTable = dynamoose.model(table, {
        "PK": {
            "type": String,
            "hashKey": true
        },
        "SK": {
            "type": String,
            "rangeKey": true
        },
        title: String,
        name: String,
        email: String,
        phoneNumber: String,
    }, {
        "saveUnknown": true,
    });

    const filter = new dynamoose.Condition()
        .where("PK")
        .eq(`company#${companyId}#recipient#${userType}#${userId}`)
        .filter("SK")
        .eq(`company#${companyId}#recipient#${userType}#${userId}`);
    
    const res = await CommunicationTable
        .query(filter)
        .exec();
    return res.toJSON();
}

async function listChatByUser(data) {

    const {
        companyId,
        userType,
        userId,
    } = data;

    const CommunicationTable = dynamoose.model(table, {
        "PK": {
            "type": String,
            "hashKey": true
        },
        "SK": {
            "type": String,
            "rangeKey": true
        },
        title: String,
        name: String,
        email: String,
        phoneNumber: String,
    }, {
        "saveUnknown": true,
    });

    const filter = new dynamoose.Condition()
        .where("PK")
        .eq(`company#${companyId}#recipient#${userType}#${userId}`)
        .filter("SK")
        .beginsWith(`company#${companyId}#chat#${userType}#${userId}#`);

    const res = await CommunicationTable
        .query(filter)
        .exec();
    return res.toJSON();
}

async function listCommunicationByChat(id) {
    const CommunicationTable = dynamoose.model(table, {
        "PK": {
            "type": String,
            "hashKey": true
        },
        "SK": {
            "type": String,
            "rangeKey": true
        },
        title: String,
        name: String,
        email: String,
        phoneNumber: String,
        content: String,
        channel: String,
        language: String,
    }, {
        "saveUnknown": true,
    });

    const filter = new dynamoose.Condition()
        .where("PK")
        .eq(id)
        .filter("SK")
        .beginsWith(`communication#`);

    const res = await CommunicationTable
        .query(filter)
        .exec();
    return res.toJSON();
}

module.exports.getRecipientUser = getRecipientUser;

module.exports.listChatByUser = listChatByUser;

module.exports.listCommunicationByChat = listCommunicationByChat;