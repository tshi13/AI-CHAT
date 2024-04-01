import { StreamChat } from "stream-chat";
import { useStore } from "./store";
import { useToast } from "@/components/ui/use-toast";
// user={{ id: "65f1a50e075c37359e2fdcef", name: "Yulun" }}
// group={{ id: "65f19f411286acb83d05d2a0", name: "Rising Start Testing" }}

async function setUpChat() {
  const user = useStore((state) => state.user);
  const {toast } = useToast();
  if(!user){
    toast({
      
    })
  }
  const chatClient = new StreamChat("hm7ff5yafac3");
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
}

export default setUpChat;
