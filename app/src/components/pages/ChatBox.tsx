import { useEffect, useState } from "react";
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
import setUpChat from "@/lib/chat.init";
import { useStore } from "@/lib/store";

export default function Chatbox() {
  const channel = useStore((state) => state.channel);
  const chatClient = useStore((state) => state.chatClient);
  const setChatClient = useStore((state) => state.setChatClient);
  const setChannel = useStore((state) => state.setChannel);

  // set the channel and channel name for the chat to display
  useEffect(() => {
    (async () => {
      const response = await setUpChat();
      setChatClient(response.chatClient);
      setChannel(response.channel);
    })();
  }, []);

  // Render the chat component if the channel has been set
  return (
    <div className="content">
      {channel && chatClient ? (
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
      ) : (
        <></>
      )}
    </div>
  );
}
