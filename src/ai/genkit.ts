import { Mistral } from '@mistralai/mistralai';
import { genkit } from 'genkit';

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY ?? "",
});

// Create and export the Genkit instance
export const ai = genkit({
  plugins: [],  // Add any plugins you need
});

// Export the chat function for direct use
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
