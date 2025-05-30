import { Mistral } from '@mistralai/mistralai';

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY ?? "",
});

export const chat = async (prompt: string) => {
  try {
    const result = await mistral.chat.complete({
      model: "mistral-small-latest",
      messages: [{
        role: "user",
        content: prompt
      }]
    });
    
    return result.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Mistral AI:', error);
    throw error;
  }
};
