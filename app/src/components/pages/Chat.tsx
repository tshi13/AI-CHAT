import { useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

const chatClient = new StreamChat("hm7ff5yafac3");
export default function Chatbox() {
  const [channel, setChannel] = useState<any>();
  const [flag, setFlag] = useState(false);
  const setupChat = async () => {
    // connect client to chat with credential

    const chatUser = { id: "65f1a50e075c37359e2fdcef", name: "Yulun" };
    const group = {
      id: "65f19f411286acb83d05d2a0",
      name: "Rising Start Testing",
    };
    await chatClient.connectUser(chatUser, chatClient.devToken(chatUser.id));
    console.log("connected")

    // creating or recreating the channel
    const tempChannel = await chatClient.channel("messaging", group.id, {
      name: group.name,
    });

    tempChannel.on("message.new", (event) => {
      if (event.user && event.message) {
        console.log(`${event.user.name}: ${event.message.text}`);
        const message = event.message.text;
        console.log(message)
      }
    });

    // await tempChannel.addMembers([{user_id:userID}],{ text: {username} + ' joined the channel.' }); // add someone to channel
    setChannel(tempChannel);
    setFlag(true);
  };

  // set the channel and channel name for the chat to display
  setupChat();
  // Render the chat component if the channel has been set
  if (flag) {
    return (
      <div className="content">
        <Chat client={chatClient} theme="str-chat__theme-light">
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>
    );
  }
}
