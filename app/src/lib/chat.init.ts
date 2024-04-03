import { StreamChat } from "stream-chat";

export default function chatSetUp() {
  const group = {
    id: "65f19f411286acb83d05d2a0",
    name: "Rising Start Testing",
  };

  const chatUser = { id: "65f1a50e075c37359e2fdcef", name: "Yulun" };
  
  const connectChannel = async (chatClient: StreamChat)=> {
    const channel = await chatClient.channel("messaging", group.id, {
      name: group.name,
    });

    // Hook channel with openai
    channel.on('message.new', event => {
      console.log('New message:', event.message);
    });
    return channel
  }

  const initChat = async () => {
    const chatClient = new StreamChat("hm7ff5yafac3");
    // connect client to chat with credential
    await chatClient.connectUser(chatUser, chatClient.devToken(chatUser.id));
    console.log("Chat initiated");
    return chatClient
  };
  return {initChat, connectChannel}
}
