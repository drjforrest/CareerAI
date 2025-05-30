'use server';
/**
 * @fileOverview A CV and cover letter generation AI agent.
 *
 * - generateCvAndCoverLetter - A function that handles the generation process.
 * - CvAndCoverLetterInput - The input type for the generateCvAndCoverLetter function.
 * - CvAndCoverLetterOutput - The return type for the generateCvAndCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CvAndCoverLetterInputSchema = z.object({
  jobPosting: z.string().describe('The job posting content.'),
  userPreferences: z
    .string()
    .optional()
    .describe('The user preferences for writing tone and CV format.'),
});
export type CvAndCoverLetterInput = z.infer<typeof CvAndCoverLetterInputSchema>;

const CvAndCoverLetterOutputSchema = z.object({
  cv: z.string().describe('The generated CV content.'),
  coverLetter: z.string().describe('The generated cover letter content.'),
});
export type CvAndCoverLetterOutput = z.infer<typeof CvAndCoverLetterOutputSchema>;

export async function generateCvAndCoverLetter(input: CvAndCoverLetterInput): Promise<CvAndCoverLetterOutput> {
  return generateCvAndCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cvAndCoverLetterPrompt',
  input: {schema: CvAndCoverLetterInputSchema},
  output: {schema: CvAndCoverLetterOutputSchema},
  prompt: `You are an AI assistant specialized in generating CVs and cover letters based on job postings and user preferences.

  Job Posting:
  {{jobPosting}}

  User Preferences:
  {{userPreferences}}

  Generate a personalized CV and cover letter tailored to the job posting, considering the user's preferences for writing tone and CV format.

  CV:
  {{cv}}

  Cover Letter:
  {{coverLetter}}`,
});

const generateCvAndCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCvAndCoverLetterFlow',
    inputSchema: CvAndCoverLetterInputSchema,
    outputSchema: CvAndCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
