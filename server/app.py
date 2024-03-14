from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes and methods


# Replace this with your actual OpenAI API key
client = OpenAI(api_key="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")

@app.route('/execute_query', methods=['POST'])
def execute_query():
    try:
        # Extract the text from the POST request's body
        data = request.json
        text = data.get('text')
        if text is None:
            return jsonify({"error": "Missing text in request"}), 400
        
        # Use the updated client to create a chat completion
        chat_completion = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Adjust the model as necessary
            messages=[
                {
                    "role": "system",
                    "content": "You are a highly professional interview assistant evaluating candidates."
                },
                {
                    "role": "user",
                    "content": f"Please evaluate the following conversation for professionalism on a scale of 0 to 100, where 0 is completely terrible and 100 is very great. Only return a number between 0 to 100, do not include anything else. Conversation: {text}"
                }
            ]
        )
        
        # Assuming the response format aligns with the expected structure
        score = chat_completion.choices[0].message.content.strip()
        return jsonify({"score": score})
    except Exception as e:
        # If an error occurs, return it as a JSON response
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)
