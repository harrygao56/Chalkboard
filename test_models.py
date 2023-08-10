import openai
import os
from decouple import config


openai.api_key = config("OPENAI_API_KEY")

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

messages = []
messages.append({"role": "system", "content": prompt})

question = {}
question['role'] = 'user'
question['content'] = "In the last section, we examined some early aspects of memory. In this section, what we’re going to do is discuss some factors that influence memory. So let’s do that by beginning with the concept on slide two, and that concept is overlearning. Basically in overlearning, the idea is that you continue to study something after you can recall it perfectly. So you study some particular topic whatever that topic is. When you can recall it perfectly, you continue to study it. This is a classic way to help when one is taking comprehensive finals later in the semester. So when you study for exam one and after you really know it all, you continue to study it. That will make your comprehensive final easier. The next factor that will influence memory relates to what we call organization. In general, if you can organize material, you can recall it better. There are lots of different types of organizational strategies and I’ve listed those on slide four. So let’s begin by talking about the first organizational strategy called clustering and is located on page five. In clustering, basically you recall items better if you can recognize that there are two or more types of things in a particular list. So let’s give a couple of lists and show you some examples of that. These examples are shown in slide six. Let’s say that I give you the first list; north, cardinal, south, robin, east, wren, west, sparrow. Now if you can recognize that north, south, east and west are points on a compass and cardinal, robin, wren and sparrow are birds, then you have a higher probability of recalling that material than if you just tried to recall the list in order. The same occurs with the second list that is located on the right hand side of page six. So let’s list these words as well; pig, cat, horse, dog, sheep, birds, cow, and fish. Now if you can recognize that these are two groups of animals; one being farm animals and the other being domestic companions, ala, pets, then you can recall that list of material better than if you just tried to recall the list in order. So again, this is another type of example of organizational strategy."
messages.append(question)

response = openai.ChatCompletion.create(model="gpt-3.5-turbo",messages=messages)
print(response['choices'][0]['message']['content'])

# audio = open('test_audio.m4a', 'rb')
# transcript = openai.Audio.transcribe("whisper-1", audio)
# print(transcript)