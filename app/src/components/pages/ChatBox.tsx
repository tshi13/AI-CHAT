import { useEffect, useState } from "react";
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
import { User } from "../../lib/types";
import axios from "axios";

const chatClient = new StreamChat("hm7ff5yafac3");
export default function Chatbox() {
  const [channel, setChannel] = useState<
    Channel<DefaultGenerics> | undefined
  >();
  const [flag, setFlag] = useState(false);
  const setupChat = async () => {
    // connect client to chat with credential
    await chatClient.connectUser(user, chatClient.devToken(user.id));

    // creating or recreating the channel
    const tempChannel = await chatClient.channel("messaging", group.id, {
      name: group.name,
    });

    tempChannel.on("message.new", (event) => {
      if (event.user && event.message) {
        console.log(`${event.user.name}: ${event.message.text}`);
        const message = event.message.text;
        axios
          .post("http://127.0.0.1:5000/execute_query", {
            text: message,
          })
          .then((response) => {
            if (setScores) {
              // Check if response.data.text is defined, otherwise use a default string value
              const newScoresString =
                response.data.score !== undefined
                  ? response.data.score
                  : "null,null,null,null,null";
              setScores(updateScores(newScoresString, scores));
            }
          })
          .catch((error) => console.error("Error fetching data:", error));
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
