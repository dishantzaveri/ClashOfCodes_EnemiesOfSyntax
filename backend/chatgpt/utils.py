import os
import openai

def generate_chatgpt(prompt):
    openai.api_key = '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'

    response = openai.Completion.create(
    model="text-davinci-003",
    prompt=prompt,
    temperature=0,
    max_tokens=2048,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    text = (response.choices[0].text).replace('\n','')
    return text