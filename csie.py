import openai


openai.api_key = "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"
		
def score_professionalism_chat(text):
    try:
        # Adjusting the request to use the chat completions endpoint
        response = openai.ChatCompletion.create(
            model="gpt-4",  # Ensure this is the correct model for chat-based interactions
            messages=[
                {"role": "system", "content": "You are a highly professional assistant."},
                {"role": "user", "content": f"Please evaluate the following conversation for professionalism on a scale of 0 to 100, where 0 is completely unprofessional and 100 is highly professional. Only return a number between 0 to 100, do not include anything else. Conversation: {text}"}
            ],
        )

        # Extracting and returning the score from the response
        return response.choices[0].message['content'].strip()
    except Exception as e:
        return f"An error occurred: {e}"

text = "Hi, for this problem I think it might be good for us to consider checking all our edge case conditions to ensure we didn't forget anything. What do you think?"
print(score_professionalism_chat(text))

