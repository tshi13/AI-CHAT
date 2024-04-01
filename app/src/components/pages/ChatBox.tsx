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
import { User } from "../../lib/types";
import axios from "axios";
import setUpChat from "@/lib/chat.init";

export default function Chatbox() {
  const [channel, setChannel] = useState<
    Channel<DefaultGenerics> | undefined
  >();
  // set the channel and channel name for the chat to display
  useEffect(() => {
    setUpChat();
  }, []);
  // Render the chat component if the channel has been set
    return (
      <div className="content">
        {chat?}
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
