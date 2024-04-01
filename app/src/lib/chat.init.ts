import { StreamChat } from "stream-chat";

async function setUpChat() {
  const user = { id: "65f1a50e075c37359e2fdcef", name: "Yulun" };
  const group = {
    id: "65f19f411286acb83d05d2a0",
    name: "Rising Start Testing",
  };

  try {
    const chatClient = new StreamChat("hm7ff5yafac3");
    // connect client to chat with credential
    await chatClient.connectUser(user, chatClient.devToken(user.id));

    // creating or recreating the channel
    const channel = await chatClient.channel("messaging", group.id, {
      name: group.name,
    });
    return { chatClient, channel };
  } catch (err) {
    throw new Error("Something went wrong, please try again later.");
  } // await tempChannel.addMembers([{user_id:userID}],{ text: {username} + ' joined the channel.' }); // add someone to channel
}

export default setUpChat;
