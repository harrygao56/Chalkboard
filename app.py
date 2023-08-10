from flask import Flask, jsonify, request, send_file
from flask_restful import Resource, Api, reqparse
import base64
from io import BytesIO
import openai
import os


# Create flask app
app = Flask(__name__)
# Create flask api object
api = Api(app)

# Set OpenAI API Key 
openai.api_key = os.getenv("OPENAI_API_KEY")

# Summarize endpoint: used to generate notes for the input text
class Summarize(Resource):
    prompt = """
    Given a lecture transcript, execute the following steps to transform the content into structured and impactful typed notes, integrating an adapted version of the Cornell Method's "cues" system:
    
    Structured Outlining:
    Primary Topics: Begin by identifying overarching themes or primary topics from the transcript.
    Related Sub-topics: For each primary topic, extract relevant sub-topics or key ideas that delve into the main theme.
    Specific Details: Under each sub-topic, detail the essential points or examples that provide clarity and context.
    
    Cues System Adaptation:
    Next to each primary topic and related sub-topic, provide a short cue or keyword in a distinct font or color. This will act as a quick reference point or trigger for the content and facilitate rapid scanning and recollection.
    
    Highlighting, Formatting, and Flagging:
    Emphasize essential points with bold or italic font styles.
    Use bullet points or numbered lists for sequential information or steps.
    Create a visual hierarchy using varying font sizes or subtle color differences between the primary topics, sub-topics, and specific details.
    If the transcript mentions that a particular point is of high importance, or that it will be on a test, flag that section with a distinct marker or icon for special attention.
    
    Linking and Cross-referencing:
    Whenever the transcript references earlier or later sections, create internal links or notes, ensuring that the content remains interconnected. This method promotes holistic comprehension and allows for effortless navigation between related content.
    
    Concluding Summaries:
    After every primary topic, craft a concise summary that encapsulates the main ideas and the connected sub-topics explored under that header. This brief recap will give readers an overview of the content and solidify crucial takeaways.
    Process the transcript employing these techniques to yield notes that are not only well-organized and optimized for learning but also prioritize and highlight the most critical content as flagged by the lecturer.
    """

    def post(self):
        input = request.form['text']

        messages = []
        messages.append({"role": "system", "content": "You are an advanced note taking AI. Your job is to take text and format it into college-style notes that can summarizes key points and can be used to study the material."})

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