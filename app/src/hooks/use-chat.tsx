import { Group, ScoresType, User } from "@/types";
import { StreamChat } from "stream-chat";
import OpenAI from "openai";
import { useStore } from "@/lib/store";

export default function useChat(chatClient: StreamChat) {
  const openai = new OpenAI({ apiKey: import.meta.env.VITE_AI_API_KEY, dangerouslyAllowBrowser: true });
  const flag = useStore((state) => state.chatFlag);
  const toggleChatFlag = useStore((state) => state.toggleChatFlag);
  const setChannel = useStore((state) => state.setChannel);

  const setupChat = async (
    user: User,
    group: Group,
    setScores?: React.Dispatch<React.SetStateAction<ScoresType>>
  ) => {
    if (!flag) {
      await chatClient.connectUser(user, chatClient.devToken(user.id));
      const tempChannel = chatClient.channel("messaging", group.id, {
        name: group.name,
      });

      tempChannel.on("message.new", async (event) => {
        if (event.user && event.message) {
          console.log(`${event.user.name}: ${event.message.text}`);
          const message = event.message.text;
          const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a highly professional interview assistant evaluating candidates.",
              },
              {
                role: "user",
                content: `Please evaluate the following conversation for the folllowing metrics: professionalism, initiative, leadership, problem solving, and teamwork on a scale of 0 to 100, where 0 is completely terrible and 100 is very great. Only return 5 numbers between 0 to 100 representing each of the 5 qualities, separated by commas. Always output the five values separated by commas. Do not include anything else. Conversation: ${message}`,
              },
            ],
          });
          const scores = completion.choices[0].message.content;
          if (setScores) {
            const newScoresString = scores
              ? scores
              : "null,null,null,null,null";
            setScores((prevScores) =>
              updateScores(newScoresString, prevScores)
            );
          }
        }
      });

      setChannel(tempChannel);
      await tempChannel.watch(); // Ensure the channel is being watched
      toggleChatFlag();
    }
  };

  function updateScores(
    newScoresString: string,
    existingScores: ScoresType
  ): ScoresType {
    const newScoresArray = newScoresString
      .split(",")
      .map((score) => (score !== "" ? parseInt(score, 10) : null));

    const fields: (keyof ScoresType)[] = [
      "professionalism",
      "initiative",
      "leadership",
      "problemSolving",
      "teamwork",
    ];

    const updatedScores: ScoresType = fields.reduce((acc, field, index) => {
      const newScore = newScoresArray[index];
      acc[field] =
        newScore !== null && !isNaN(newScore)
          ? newScore
          : existingScores[field];
      return acc;
    }, {} as ScoresType);

    return updatedScores;
  }

  return {setupChat};
}
