import OpenAI from "openai";

interface Options {
    prompt: string;
}



export const orthographyCheckUseCase = async ( openai:OpenAI, options: Options) => {
    const { prompt } = options;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Cada vez que respondas debes mencionar mi nombre el cual "Varekay" y siempre se amable',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
    });


    console.log(completion);

    return completion.choices[0];


    return {
      prompt: prompt,
      apikey: process.env.OPENAI_API_KEY,
    };
}