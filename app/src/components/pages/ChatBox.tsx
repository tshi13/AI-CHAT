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
import { User, Group } from "../../types";
import axios from 'axios';
import { ScoresType } from "../../types";


const chatClient = new StreamChat("hm7ff5yafac3");
// const userToken = 'DEV'; //DEV TOKEN, DO NOT CHANGE!

interface ChatBoxProps {
	user: User;
	group: Group;
	newHeight: number;
  scores: ScoresType;
	setScores?: React.Dispatch<React.SetStateAction<ScoresType>>;
}

export default function Chatbox({ user, group, newHeight, scores, setScores }: ChatBoxProps) {
  
  const [channel, setChannel] = useState<any>();
  const [flag, setFlag] = useState(false);
  // const letChatHeight = newHeight - 10;
  // const [userImage, setUserImage] = useState(props.userImage);
  // const [groupImage, setGroupImage] = useState(props.groupPicture);

	function updateScores(newScoresString: string, existingScores: ScoresType): ScoresType {
		const newScoresArray = newScoresString.split(',').map(score => score !== "" ? parseInt(score, 10) : null);
	
		const fields: (keyof ScoresType)[] = [
			'professionalism',
			'initiative',
			'leadership',
			'problem-solving',
			'teamwork'
		];
	
		const updatedScores: ScoresType = fields.reduce((acc, field, index) => {
			const newScore = newScoresArray[index];
			// Check if newScore is not null and is a valid number, otherwise use the existing score
			acc[field] = newScore !== null && !isNaN(newScore) ? newScore : existingScores[field];
			return acc;
		}, {} as ScoresType);
		console.log(updatedScores);
	
		return updatedScores;
	}
	
	


  const setupChat = async () => {
    // connect client to chat with credential
    await chatClient.connectUser(user, chatClient.devToken(user.id));

    // creating or recreating the channel
    const tempChannel = await chatClient.channel("messaging", group.id, {
      name: group.name,
    });

		tempChannel.on('message.new', event => {
			if (event.user && event.message) {
				console.log(`${event.user.name}: ${event.message.text}`);
				const message = event.message.text;
				axios.post('http://127.0.0.1:5000/execute_query', {
					text: message
				})
				.then(response => {
					if (setScores) {
						// Check if response.data.text is defined, otherwise use a default string value
						//@ts-ignore
						const newScoresString = response.data.score !== undefined ? response.data.score : "null,null,null,null,null";
						setScores(updateScores(newScoresString, scores));
				}	
				})
				.catch(error => console.error('Error fetching data:', error));
			}
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