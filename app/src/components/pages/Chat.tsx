import { useEffect } from "react";
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
import { User, Group } from "../../types";
import { ScoresType } from "../../types";
import React from "react";
import useChat from "@/hooks/use-chat";
import { StreamChat } from "stream-chat";
import { useStore } from "@/lib/store";

interface ChatBoxProps {
  user: User;
  group: Group;
  setScores?: React.Dispatch<React.SetStateAction<ScoresType>>;
}

const chatClient = new StreamChat("hm7ff5yafac3");

function Chatbox({ user, group, setScores }: ChatBoxProps) {
  const { setupChat } = useChat(chatClient);
  const flag = useStore((state) => state.chatFlag);
  const toggleChatFlag = useStore((state) => state.toggleChatFlag);
  const channel = useStore((state) => state.channel)!;
  const clearChannel = useStore((state) => state.clearChannel);

  useEffect(() => {
    setupChat(user, group, setScores);
    return () => {
      chatClient.disconnectUser().then(() => console.log("User disconnected"));
      toggleChatFlag();
      clearChannel();
    };
  }, []);
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

export default Chatbox;
