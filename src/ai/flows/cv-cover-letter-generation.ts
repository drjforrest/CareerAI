
'use server';
/**
 * @fileOverview A CV and cover letter generation AI agent.
 *
 * - generateCvAndCoverLetter - A function that handles the generation process.
 * - CvAndCoverLetterInput - The input type for the generateCvAndCoverLetter function.
 * - CvAndCoverLetterOutput - The return type for the generateCvAndCoverLetter function.
 */

import { chat } from '@/ai/genkit';
import {z} from 'genkit';

const CvAndCoverLetterInputSchema = z.object({
  jobPosting: z.string().describe('The job posting content.'),
  userPreferences: z
    .string()
    .optional()
    .describe('The user preferences for writing tone and CV format. This can also include desired sections or specific formatting instructions (e.g., "use bullet points for responsibilities", "include a summary section") to make the output resemble a particular style.'),
});
export type CvAndCoverLetterInput = z.infer<typeof CvAndCoverLetterInputSchema>;

const CvAndCoverLetterOutputSchema = z.object({
  cv: z.string().describe('The generated CV content, formatted with clear sections, Markdown-style headings (e.g., "## Experience"), and bullet points (e.g., "- Managed projects") for readability, resembling a professional CV document structure.'),
  coverLetter: z.string().describe('The generated cover letter content, following a professional letter format and maintaining the specified writing tone.'),
});
export type CvAndCoverLetterOutput = z.infer<typeof CvAndCoverLetterOutputSchema>;

export const generateCvAndCoverLetter = async (input: CvAndCoverLetterInput): Promise<CvAndCoverLetterOutput> => {
  const prompt = `Generate a CV and cover letter for the following job posting:\n${input.jobPosting}\n\nPreferences: ${input.userPreferences || 'None provided'}`;

  try {
    const response = await chat(prompt);
    
    if (!response || typeof response !== 'string') {
      throw new Error('Invalid response format from AI');
    }
    
    return {
      cv: response,
      coverLetter: response
    };
  } catch (error) {
    console.error('Error generating CV and cover letter:', error);
    throw error;
  }
};
