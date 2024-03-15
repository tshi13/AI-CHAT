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
import { User, Group } from "./types";

const chatClient = new StreamChat("hm7ff5yafac3");
// const userToken = 'DEV'; //DEV TOKEN, DO NOT CHANGE!

export default function Chatbox({
  user,
  group,
  newHeight,
}: {
  user: User;
  group: Group;
  newHeight: number;
}) {
  const [channel, setChannel] = useState<any>();
  const [flag, setFlag] = useState(false);
  const letChatHeight = newHeight - 10;
  // const [userImage, setUserImage] = useState(props.userImage);
  // const [groupImage, setGroupImage] = useState(props.groupPicture);

  const setupChat = async () => {
    // connect client to chat with credential
    await chatClient.connectUser(user, chatClient.devToken(user.id));

    // creating or recreating the channel
    let tempChannel = await chatClient.channel("messaging", group.id, {
      name: group.name,
    });

    // await tempChannel.addMembers([{user_id:userID}],{ text: {username} + ' joined the channel.' }); // add someone to channel
    setChannel(tempChannel);
    setFlag(true);
  };

  /**
   *  This useEffect is called when the component is first rendered,
   *  it will set the channel and channel name for the chat to display
   */
  useEffect(() => {
    //let imgFile = Buffer.from(groupImage, 'base64');
    //let imgURL = URL.createObjectURL(imgFile);
    //setGroupImage(imgURL);
    setupChat();
  }, []);

  // Render the chat component if the channel has been set
  if (flag) {
    return (
      <div
        className="chatbox2"
        style={{ marginTop: "10px", height: letChatHeight }}
      >
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
