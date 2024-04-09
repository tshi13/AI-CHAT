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
import React from "react";


const chatClient = new StreamChat("hm7ff5yafac3");
// const userToken = 'DEV'; //DEV TOKEN, DO NOT CHANGE!

interface ChatBoxProps {
	user: User;
	group: Group;
	newHeight: number;
	setScores?: React.Dispatch<React.SetStateAction<ScoresType>>;
}

function Chatbox({ user, group, setScores }: ChatBoxProps) {

	const [channel, setChannel] = useState<any>();
	const [flag, setFlag] = useState(false);


	function updateScores(newScoresString: string, existingScores: ScoresType): ScoresType {
		const newScoresArray = newScoresString.split(',').map(score => score !== "" ? parseInt(score, 10) : null);

		const fields: (keyof ScoresType)[] = [
			'professionalism',
			'initiative',
			'leadership',
			'problemSolving',
			'teamwork'
		];

		const updatedScores: ScoresType = fields.reduce((acc, field, index) => {
			const newScore = newScoresArray[index];
			// Check if newScore is not null and is a valid number, otherwise use the existing score
			acc[field] = newScore !== null && !isNaN(newScore) ? newScore : existingScores[field];
			return acc;
		}, {} as ScoresType);
		// console.log(updatedScores);

		return updatedScores;
	}



	useEffect(() => {
    const setupChat = async () => {
      if (!flag) {
        await chatClient.connectUser(user, chatClient.devToken(user.id));
        const tempChannel = chatClient.channel("messaging", group.id, {
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
                  const newScoresString = response.data.score !== undefined ? response.data.score : "null,null,null,null,null";
                  setScores(prevScores => updateScores(newScoresString, prevScores));
                }
              })
              .catch(error => console.error('Error fetching data:', error));
          }
        });

        setChannel(tempChannel);
        await tempChannel.watch(); // Ensure the channel is being watched
        setFlag(true);
      }
    };

    setupChat();
		console.log("Chatbox component mounted")

		// Cleanup function
		return () => {
			chatClient.disconnectUser().then(() => console.log("User disconnected"));
		};

  }, []); // Dependencies to trigger the effect


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

export default Chatbox;