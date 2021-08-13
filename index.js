const repository = require('./get');


async function app () {
  const [user] = await repository.getRecipientUser({
    companyId: 2,
    userType: 'application',
    userId: 1
  });

  console.log('Usuário ------');
  console.log(user);

  const chats = await repository.listChatByUser({
    companyId: 2,
    userType: 'application',
    userId: 1
  })

  console.log('Chats ------');
  console.log(chats);

  chats.forEach(async (element) => {
    const communications = await repository.listCommunicationByChat(element.SK);

    console.log(`Mensagens do chat ${element.SK} ------`);
    console.log(communications);
  });

}

app();