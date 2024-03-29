import React, {useEffect, useState} from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import axios from 'axios';

const chatClient = new StreamChat('hm7ff5yafac3');
const userToken = 'DEV'; //DEV TOKEN, DO NOT CHANGE!

// the purpose of this function in <GetStream2 /> is to actually display the chat
// after the user has already been added to the chat by the global_moderator
// back in <GetStream />

export default function Chatbox(props)  {
	const [channel, setChannel] = useState();
	const [channelName, setChannelName] = useState();
	const {userID,username,groupID,groupName, setTaimingscore, setYulunscore} = props;
	const [flag, setFlag] = useState(false);
	const newHeight = props.newHeight;
	// const [userImage, setUserImage] = useState(props.userImage);
	// const [groupImage, setGroupImage] = useState(props.groupPicture);

	const letChatHeight = newHeight - 10;

	
	/** 
	 *  This useEffect is called when the component is first rendered,
	 *  it will set the channel and channel name for the chat to display
	 */
	useEffect(()=> {
		//let imgFile = Buffer.from(groupImage, 'base64');
		//let imgURL = URL.createObjectURL(imgFile);
		//setGroupImage(imgURL);
		const setupChat = async() => {
	
      // connecting the actual user with userID
			await chatClient.connectUser( //create new user or connect to existing user
			{
				id: userID,
				name: username,
				//image: '<img src={`data:image/png;base64,${userImage}`}>',
			},
			chatClient.devToken(userID), //use devtoken as usertoken for now
		);
	
      // creating or recreating the channel
			let tempChannel = await chatClient.channel('messaging', groupID, {  //make channel
				// add as many custom fields as you'd like
				image: 'https://www.drupal.org/files/project-images/react.png',
				name: groupName,
				//image: imgURL,
			});

			tempChannel.on('message.new', event => {
				console.log(`${event.user.name}: ${event.message.text}`);
				const message = event.message.text;
				axios.post('http://127.0.0.1:5000/execute_query', {
					text: message
				})
				.then(response => {
					console.log(response.data);
					if (event.user.name === "Yulun") {
						setYulunscore(response.data.score);
					} else if (event.user.name === "Taiming") {
						setTaimingscore(response.data.score);
					}
				})
				.catch(error => console.error('Error fetching data:', error));
				
			});

			// await tempChannel.addMembers([{user_id:userID}],{ text: {username} + ' joined the channel.' }); // add someone to channel
			setChannel(tempChannel);
			setFlag(true);
		}
		setupChat();		
	},[username, groupName]);

	/**
	 *  Render the chat component if the channel has been set
	 */

	if (flag) {
		return (
		// actually rendering the chat since the user has been added to the
		// group already
		<div className="chatbox2" style={{marginTop: '10px', height: letChatHeight}}>
		
				<Chat client={chatClient} theme='str-chat__theme-light'>
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


