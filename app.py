from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import openai
import os
from flask_cors import CORS


# Create flask app
app = Flask(__name__)
CORS(app)
# Create flask api object
api = Api(app)

# Set OpenAI API Key 
openai.api_key = os.getenv("OPENAI_API_KEY")

# Summarize endpoint: used to generate notes for the input text
class Summarize(Resource):
    prompt = """
    Please generate detailed and structured lecture notes based on the content provided. Ensure the notes have the following structure:

    Each main topic should be highlighted with a sub-heading.
    Under each main topic, provide sub-topics or key points as bullet points.
    Include at least 3 levels of sub-bullets for deeper explanation or further breakdown of each sub-topic.
    Reinforce or expand upon main points with direct quotes from the lecture where they serve to offer deeper insights. Quotes should be used sparingly and integrated as sub-bullets.
    Aim for comprehensive coverage without over-summarizing. The final notes should allow someone unfamiliar with the lecture to grasp the key concepts and their significance.
    Please write in English language.
    """

    def post(self):
        input = request.form['text']

        messages = []
        messages.append({"role": "system", "content": self.prompt})

        question = {}
        question['role'] = 'user'
        question['content'] = input
        messages.append(question)
        output = openai.ChatCompletion.create(model="gpt-3.5-turbo",messages=messages)
        return output['choices'][0]['message']['content']


# Transcribe endpoint: used to generate a transcription of an audio file
class Transcribe(Resource):
    def post(self):
        input = request.file['file']
        input = input.open()
        if not input:
            return "Fail"
        transcript = openai.Audio.transcribe("whisper-1", input)
        return transcript['text']


# Adding api endpoints
api.add_resource(Summarize, '/summarize')
api.add_resource(Transcribe, '/transcribe')

if __name__ == '__main__':
    app.run(debug='true')